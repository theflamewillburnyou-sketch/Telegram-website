import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type TickerItem = {
  id: string
  label: string
  price: string
  changePct: number | null
}

type YahooChart = {
  chart?: {
    result?: Array<{
      meta?: {
        regularMarketPrice?: number
        chartPreviousClose?: number
        previousClose?: number
        currency?: string
      }
    }>
    error?: unknown
  }
}

const YAHOO: Array<{
  id: string
  label: string
  symbol: string
  format: "usd" | "index" | "yield" | "fx"
}> = [
  { id: "BRENT", label: "BRENT", symbol: "BZ=F", format: "usd" },
  { id: "WTI", label: "WTI", symbol: "CL=F", format: "usd" },
  { id: "NATURAL_GAS", label: "NAT GAS", symbol: "NG=F", format: "usd" },
  { id: "ENERGY_STOCKS", label: "XLE", symbol: "XLE", format: "usd" },
  { id: "GOLD", label: "GOLD", symbol: "GC=F", format: "usd" },
  { id: "SILVER", label: "SILVER", symbol: "SI=F", format: "usd" },
  { id: "COPPER", label: "COPPER", symbol: "HG=F", format: "usd" },
  { id: "S&P_500", label: "S&P 500", symbol: "^GSPC", format: "index" },
  { id: "NASDAQ", label: "NASDAQ", symbol: "^IXIC", format: "index" },
  { id: "DOW", label: "DOW", symbol: "^DJI", format: "index" },
  { id: "ES_FUTURES", label: "ES", symbol: "ES=F", format: "index" },
  { id: "FTSE_100", label: "FTSE", symbol: "^FTSE", format: "index" },
  { id: "DAX", label: "DAX", symbol: "^GDAXI", format: "index" },
  { id: "EURO_STOXX_50", label: "STOXX50", symbol: "^STOXX50E", format: "index" },
  { id: "NIFTY_50", label: "NIFTY", symbol: "^NSEI", format: "index" },
  { id: "BANK_NIFTY", label: "BANKNIFTY", symbol: "^NSEBANK", format: "index" },
  { id: "SENSEX", label: "SENSEX", symbol: "^BSESN", format: "index" },
  { id: "US_10Y", label: "US 10Y", symbol: "^TNX", format: "yield" },
  { id: "US_2Y", label: "US 2Y", symbol: "2YY=F", format: "yield" },
  { id: "USD", label: "DXY", symbol: "DX-Y.NYB", format: "index" },
  { id: "EUR", label: "EUR/USD", symbol: "EURUSD=X", format: "fx" },
  { id: "JPY", label: "USD/JPY", symbol: "USDJPY=X", format: "fx" },
  { id: "INR", label: "USD/INR", symbol: "INR=X", format: "fx" },
]

let cache: { at: number; items: TickerItem[] } | null = null
const CACHE_MS = 60_000

function formatPrice(value: number, format: "usd" | "index" | "yield" | "fx") {
  if (!Number.isFinite(value)) return "—"
  if (format === "yield") return `${value.toFixed(2)}%`
  if (format === "fx") {
    return value >= 20 ? value.toFixed(2) : value.toFixed(4)
  }
  if (format === "usd") {
    if (value >= 1000) {
      return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
    }
    if (value >= 100) {
      return `$${value.toFixed(2)}`
    }
    return `$${value.toFixed(3)}`
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

async function fetchYahoo(symbol: string): Promise<{ price: number; prev: number } | null> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=5d`
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "application/json",
    },
    next: { revalidate: 0 },
  })
  if (!res.ok) return null
  const data = (await res.json()) as YahooChart
  const meta = data.chart?.result?.[0]?.meta
  const price = meta?.regularMarketPrice
  if (typeof price !== "number") return null
  const prev = meta?.chartPreviousClose ?? meta?.previousClose ?? price
  return { price, prev }
}

async function fetchCrypto(): Promise<TickerItem[]> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true",
    { next: { revalidate: 0 } }
  )
  if (!res.ok) return []
  const data = (await res.json()) as Record<
    string,
    { usd?: number; usd_24h_change?: number }
  >
  const map: Array<{ id: string; label: string; key: string }> = [
    { id: "BTC", label: "BTC", key: "bitcoin" },
    { id: "ETH", label: "ETH", key: "ethereum" },
    { id: "SOL", label: "SOL", key: "solana" },
  ]
  return map.flatMap(({ id, label, key }) => {
    const row = data[key]
    if (!row?.usd) return []
    return [
      {
        id,
        label,
        price: formatPrice(row.usd, "usd"),
        changePct:
          typeof row.usd_24h_change === "number" ? row.usd_24h_change : null,
      },
    ]
  })
}

async function mapPool<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = []
  let i = 0
  async function run() {
    while (i < items.length) {
      const idx = i++
      results[idx] = await worker(items[idx])
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => run()))
  return results
}

export async function GET() {
  try {
    if (cache && Date.now() - cache.at < CACHE_MS) {
      return NextResponse.json({
        updatedAt: cache.at,
        cached: true,
        items: cache.items,
      })
    }

    const [crypto, yahooRows] = await Promise.all([
      fetchCrypto(),
      mapPool(YAHOO, 4, async (row) => {
        try {
          const quote = await fetchYahoo(row.symbol)
          if (!quote) return null
          const changePct =
            quote.prev !== 0
              ? ((quote.price - quote.prev) / quote.prev) * 100
              : null
          return {
            id: row.id,
            label: row.label,
            price: formatPrice(quote.price, row.format),
            changePct,
          } satisfies TickerItem
        } catch {
          return null
        }
      }),
    ])

    const yahooItems = yahooRows.filter((x): x is TickerItem => Boolean(x))

    // Preferred display order (unique ids from your lists, free sources only)
    const order = [
      "BTC",
      "ETH",
      "SOL",
      "BRENT",
      "WTI",
      "NATURAL_GAS",
      "GOLD",
      "SILVER",
      "COPPER",
      "ENERGY_STOCKS",
      "S&P_500",
      "NASDAQ",
      "DOW",
      "ES_FUTURES",
      "FTSE_100",
      "DAX",
      "EURO_STOXX_50",
      "NIFTY_50",
      "BANK_NIFTY",
      "SENSEX",
      "US_10Y",
      "US_2Y",
      "USD",
      "EUR",
      "JPY",
      "INR",
    ]

    const byId = new Map<string, TickerItem>()
    ;[...crypto, ...yahooItems].forEach((item) => byId.set(item.id, item))

    const items = order.map((id) => byId.get(id)).filter((x): x is TickerItem => Boolean(x))

    // Skipped (no free/reliable feed): GLOBAL_MARKETS

    cache = { at: Date.now(), items }

    return NextResponse.json({
      updatedAt: cache.at,
      cached: false,
      skipped: ["GLOBAL_MARKETS"],
      items,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to load ticker",
        detail: error instanceof Error ? error.message : "unknown",
        items: cache?.items ?? [],
      },
      { status: 500 }
    )
  }
}
