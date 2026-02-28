import { Dice5 } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-card py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <Dice5 className="h-6 w-6 text-primary" />
              <span className="font-bold text-foreground">Arcane Dice Co.</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Handcrafted premium dice for tabletop gaming enthusiasts worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground text-sm mb-4">Shop</h4>
            <ul className="flex flex-col gap-2">
              {["All Dice", "Sets", "Singles", "Accessories", "Gift Cards"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground text-sm mb-4">Company</h4>
            <ul className="flex flex-col gap-2">
              {["About Us", "Our Process", "Blog", "Careers", "Press"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground text-sm mb-4">Support</h4>
            <ul className="flex flex-col gap-2">
              {["Contact Us", "Shipping", "Returns", "FAQ", "Size Guide"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {`\u00A9 ${new Date().getFullYear()} Arcane Dice Co. All rights reserved.`}
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
              <a key={item} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
