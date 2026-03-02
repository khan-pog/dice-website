import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Arcane Dice Co." className="h-7 w-7 rounded" />
              <span className="font-bold text-foreground">Arcane Dice Co.</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Handcrafted premium dice for tabletop gaming enthusiasts worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground text-sm mb-4">Shop</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/#collection" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  All Dice Sets
                </Link>
              </li>
              <li>
                <Link href="/product/shadowthorn-gothic-dice" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Shadowthorn Gothic
                </Link>
              </li>
              <li>
                <Link href="/product/eye-of-sauron-resin-dice" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Eye of Sauron
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Your Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground text-sm mb-4">Company</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground text-sm mb-4">Support</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {`\u00A9 ${new Date().getFullYear()} Arcane Dice Co. All rights reserved.`}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/faq" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
