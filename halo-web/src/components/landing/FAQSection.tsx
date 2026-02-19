import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'What is a delta-neutral strategy?',
    a: 'Delta-neutral means the portfolio has zero net exposure to the underlying asset price. By going long (staking) and short (perpetual) BNB simultaneously, price movements cancel out, leaving only the yield from both positions.',
  },
  {
    q: 'Where does the yield come from?',
    a: 'Two sources: (1) Staking yield from liquid staking BNB as asBNB (~3-5% APY), and (2) Funding rate payments from shorting BNB perpetuals (~8-20% APY). Both are structural yields, not inflationary token rewards.',
  },
  {
    q: 'What are the risks?',
    a: 'Primary risks include: Funding rate flipping negative (historically rare for BNB), smart contract risk, asBNB de-peg risk, liquidation risk if collateral ratio drops below maintenance margin, and oracle divergence between spot and perp pricing.',
  },
  {
    q: 'What happens if BNB price drops 50%?',
    a: 'The staking position loses 50% in USD terms, but the short perp gains approximately 50%, resulting in near-zero net P&L. The vault remains delta-neutral. You continue earning yield from both positions.',
  },
  {
    q: 'How is the collateral ratio maintained?',
    a: 'The Risk Engine continuously monitors the collateral ratio. If it drops below 160%, the vault automatically rebalances by adjusting position sizes. Emergency liquidation occurs below 130% to protect depositors.',
  },
  {
    q: 'What is the minimum deposit?',
    a: 'Minimum deposit is 0.1 BNB. There is no maximum, but large deposits may experience slippage during the entry execution.',
  },
];

export function FAQSection() {
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="label-uppercase text-primary mb-3">Risk Matrix</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight-custom">
            FAQ
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-px">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border bg-card px-4"
            >
              <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider hover:text-primary hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
