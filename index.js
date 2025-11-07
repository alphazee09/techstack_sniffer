#!/usr/bin/env node

import Wappalyzer from 'wappalyzer'
import dns from 'dns/promises'
import whois from 'whois-json'
import chalk from 'chalk'
import ora from 'ora'
import axios from 'axios'

const spinner = ora()

async function scanSite(url) {
  try {
    spinner.start(`Scanning ${url} ...`)

    const wappalyzer = new Wappalyzer({ debug: false })
    await wappalyzer.init()

    const site = await wappalyzer.open(url)
    const results = await site.analyze()

    spinner.succeed(chalk.green(`Tech Identified for ${url}`))

    // DNS + IP
    spinner.start(`Fetching DNS & IP...`)
    let dnsInfo = await dns.lookup(new URL(url).hostname)
    spinner.succeed(`DNS & IP Retrieved`)

    // SSL info
    spinner.start(`Fetching SSL info...`)
    const ssl = await axios.get(url, { timeout: 8000 })
    spinner.succeed(`SSL check done`)

    // WHOIS
    spinner.start(`Fetching WHOIS info...`)
    const whoisInfo = await whois(new URL(url).hostname)
    spinner.succeed(`WHOIS Loaded`)

    console.log(chalk.cyan(`\n=== Technology Stack ===`))
    results.technologies.forEach(t =>
      console.log(chalk.yellow(`- ${t.name} (${t.categories.map(c => c.name).join(", ")})`))
    )

    console.log(chalk.magenta(`\n=== Server Info ===`))
    console.log(chalk.white(`IP: ${dnsInfo.address}`))
    console.log(chalk.white(`Protocol: ${ssl.request.protocol}`))
    console.log(chalk.white(`Server: ${ssl.headers.server || "Unknown"}`))

    console.log(chalk.blue(`\n=== WHOIS Registrar ===`))
    console.log(chalk.white(`Registrar: ${whoisInfo.registrar || "Unknown"}`))
    console.log(chalk.white(`Country: ${whoisInfo.country || "Unknown"}`))
    console.log(chalk.white(`Created: ${whoisInfo.creationDate || "Unknown"}`))
    console.log(chalk.white(`Expires: ${whoisInfo.registrarRegistrationExpirationDate || "Unknown"}`))

    console.log(chalk.green(`\nDone ✅\n`))

  } catch (err) {
    spinner.fail(chalk.red(`Error: ${err.message}`))
  }
}

const input = process.argv[2]
if (!input) {
  console.log(chalk.red("Usage: techsniff https://example.com"))
  process.exit(1)
}

scanSite(input)
