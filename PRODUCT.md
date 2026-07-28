# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: individual and institutional investors in Venezuela and the region looking to grow capital through regulated, structured investment vehicles rather than informal deals or bank-only products.

Secondary: companies across strategic sectors (energy, food/agro, technology, logistics, real estate) seeking capital outside of bank credit — for expansion, modernization, or debt-reduction — and open to KFG structuring the financing relationship.

The landing page should speak to investors first; company-financing content is present but secondary in framing.

## Product Purpose

KFG Sociedad de Inversión is a regulated Venezuelan investment entity. It captures capital from investors and channels it into vetted growth-stage companies and projects, under a defined investment policy. Success = investors placing capital through KFG (booking a meeting) and qualified companies engaging KFG for financing.

## Positioning

KFG's differentiator is regulatory legitimacy: it operates as a formally SUNAVAL-supervised Sociedad de Inversión, settled through the Caja Venezolana de Valores, with KYC/AML processes and external audits. Neighboring alternatives in the Venezuelan market are informal capital arrangements or bank-only credit, which cannot truthfully claim this regulated structure.

## Operating Context

- Six-step investment lifecycle the site should communicate: Identificación → Evaluación → Estructuración → Levantamiento → Ejecución → Retorno.
- Two audience tracks with distinct value props: Inversionistas (diversified access, competitive returns, flexible entry amounts, regulatory protection, expert decisions, market entry) and Empresas (alternative to bank credit, expansion capital, deleveraging, corporate support, visibility, path to capital markets).
- Primary conversion action across the site: "Agenda una reunión" (book a meeting) — there is no self-serve investment flow; everything routes to a human meeting.
- Sector focus: Energía, Alimentos y Agro, Tecnología, Logística, Inmobiliario.
- Site content and copy are in Spanish (es), targeting the Venezuelan market.

## Capabilities and Constraints

- Regulated under Venezuela's Ley de Entidades de Inversión Colectiva (G.O. 36.027, 1996), supervised by SUNAVAL, settled via the Caja Venezolana de Valores.
- KYC/AML processes and periodic internal/external audits are real, confirmed operating practices — not aspirational claims.
- No self-serve investment or onboarding flow exists; all engagement funnels to booking a meeting (WhatsApp or contact form/section).
- Minimum investment amount is intentionally not published on the site — the reference copy defers that detail to a live conversation with the team. Do not invent a number.
- Built as a Next.js (App Router) + TypeScript + Tailwind CSS site per `TECHNICAL_ARCHITECTURE.md`; that document governs code structure/layering and is binding for implementation, not for visual direction.
- `ksi_reference.html` is the narrative/content and section-order reference (do not copy its code literally) — its copy is confirmed real content: services, sectors, compliance claims, FAQ, WhatsApp number, and office address are all usable as-is.

## Brand Commitments

- Name: KFG Sociedad de Inversión.
- Voice: institutional, rigorous, transparency- and compliance-forward — leads with regulatory credibility rather than hype.
- Existing brand assets: KFG logo (favicon + header/footer lockups) and an `iso_kfg.svg` isotype are already in the repo; `images/` holds three photographic assets (image1.jpg, image2.jpg, image3.jpg) available for real use, not placeholders.

## Evidence on Hand

- `ksi_reference.html`: confirmed real copy for services, sectors, six-step process, investor/company advantage sets, compliance section, and FAQ.
- Confirmed contact facts: WhatsApp +1 305 697 5259; office at Torre Caracas Campus, Piso 4, La Trinidad, Caracas, Venezuela.
- **Open/placeholder:** the contact email (`info@kfg.com.ve`) is explicitly flagged in the reference file as a placeholder pending the real address — do not treat it as final; confirm before shipping.
- No testimonials, case studies, press mentions, or performance/return figures exist yet. Do not fabricate any.
- Three real photo assets in `images/` (office/team-type photography, unconfirmed exact subject) available for use.

## Product Principles

1. Lead with regulatory legitimacy, not yield promises — SUNAVAL supervision and compliance rigor are the trust mechanism, especially given no real return figures exist.
2. Serve investors as the primary voice of the site; keep the company-financing track present but secondary.
3. Every meaningful CTA converges on booking a human meeting — there is no self-serve product to design around.
4. Treat Spanish-language, Venezuela-specific regulatory and institutional register as a fixed constraint, not a stylistic choice.
5. Never invent figures, testimonials, or claims beyond what's in Evidence on Hand — this is a regulated financial entity.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established beyond standard web accessibility practice.
