import {
  AddItemButton,
  ArrayItemCard,
  FieldGrid,
  ImageAssetField,
  NumberField,
  SectionCard,
  TextAreaField,
  TextField,
  ToggleField,
} from "@/components/admin/form-fields";
import type { EditorSectionProps } from "@/components/admin/editor-types";

const templates = {
  pricingCard: { badge: "New tier", name: "Ticket name", price: 0, description: "Describe the ticket.", featured: false },
  faqItem: { question: "New question", answer: "Write the answer here." },
  registrationStep: { title: "New step", description: "Explain the registration step." },
  socialLink: { label: "New social", url: "https://example.com" },
} as const;

export function PricingSection({ content, updatePath, addItem, removeItem }: EditorSectionProps) {
  return (
    <SectionCard
      id="pricing"
      eyebrow="Pricing"
      title="Pricing cards, active window, and supporting note"
      description="The public pricing section depends on these values staying aligned and easy to compare."
    >
      <FieldGrid>
        <TextField label="Eyebrow" value={content.pricing.eyebrow} onChange={(value) => updatePath(["pricing", "eyebrow"], value)} />
        <TextAreaField label="Title" value={content.pricing.title} onChange={(value) => updatePath(["pricing", "title"], value)} rows={4} />
        <TextField label="Period label" value={content.pricing.periodLabel} onChange={(value) => updatePath(["pricing", "periodLabel"], value)} />
        <TextField label="Period text" value={content.pricing.periodText} onChange={(value) => updatePath(["pricing", "periodText"], value)} />
      </FieldGrid>

      <TextAreaField
        label="Description"
        value={content.pricing.description}
        onChange={(value) => updatePath(["pricing", "description"], value)}
        rows={4}
      />
      <TextAreaField
        label="Footnote"
        value={content.pricing.footnote}
        onChange={(value) => updatePath(["pricing", "footnote"], value)}
        rows={4}
      />

      <div className="space-y-4">
        {content.pricing.cards.map((item, index) => (
          <ArrayItemCard
            key={`${item.name}-${index}`}
            eyebrow={`Pricing card ${String(index + 1).padStart(2, "0")}`}
            title={item.name}
            canRemove={content.pricing.cards.length > 2}
            onRemove={() => removeItem(["pricing", "cards"], index)}
          >
            <FieldGrid>
              <TextField label="Badge" value={item.badge} onChange={(value) => updatePath(["pricing", "cards", index, "badge"], value)} />
              <TextField label="Name" value={item.name} onChange={(value) => updatePath(["pricing", "cards", index, "name"], value)} />
              <NumberField label="Price" value={item.price} onChange={(value) => updatePath(["pricing", "cards", index, "price"], value)} />
              <ToggleField
                label="Featured tier"
                checked={item.featured}
                onChange={(checked) => updatePath(["pricing", "cards", index, "featured"], checked)}
                helper="Featured cards get stronger emphasis on the public page."
              />
            </FieldGrid>
            <TextAreaField
              label="Description"
              value={item.description}
              onChange={(value) => updatePath(["pricing", "cards", index, "description"], value)}
              rows={4}
            />
          </ArrayItemCard>
        ))}
        <AddItemButton onClick={() => addItem(["pricing", "cards"], templates.pricingCard)}>Tambah pricing card</AddItemButton>
      </div>
    </SectionCard>
  );
}

export function FaqSection({ content, updatePath, addItem, removeItem }: EditorSectionProps) {
  return (
    <SectionCard
      id="faq"
      eyebrow="FAQ"
      title="Questions, answers, and support contact"
      description="This section keeps support information close to the FAQ itself so visitors never lose the next step."
    >
      <FieldGrid>
        <TextField label="Eyebrow" value={content.faq.eyebrow} onChange={(value) => updatePath(["faq", "eyebrow"], value)} />
        <TextAreaField label="Title" value={content.faq.title} onChange={(value) => updatePath(["faq", "title"], value)} rows={4} />
        <TextField label="Contact label" value={content.faq.contactLabel} onChange={(value) => updatePath(["faq", "contactLabel"], value)} />
        <TextField label="Contact value" value={content.faq.contactValue} onChange={(value) => updatePath(["faq", "contactValue"], value)} />
      </FieldGrid>

      <TextAreaField label="Description" value={content.faq.description} onChange={(value) => updatePath(["faq", "description"], value)} rows={4} />

      <div className="space-y-4">
        {content.faq.items.map((item, index) => (
          <ArrayItemCard
            key={`${item.question}-${index}`}
            eyebrow={`FAQ item ${String(index + 1).padStart(2, "0")}`}
            title={item.question}
            canRemove={content.faq.items.length > 3}
            onRemove={() => removeItem(["faq", "items"], index)}
          >
            <TextAreaField label="Question" value={item.question} onChange={(value) => updatePath(["faq", "items", index, "question"], value)} rows={3} />
            <TextAreaField label="Answer" value={item.answer} onChange={(value) => updatePath(["faq", "items", index, "answer"], value)} rows={5} />
          </ArrayItemCard>
        ))}
        <AddItemButton onClick={() => addItem(["faq", "items"], templates.faqItem)}>Tambah FAQ item</AddItemButton>
      </div>
    </SectionCard>
  );
}

export function RegistrationSection({ content, updatePath, addItem, removeItem }: EditorSectionProps) {
  return (
    <SectionCard
      id="registration"
      eyebrow="Registration"
      title="External registration flow configuration"
      description="Every public registration CTA should stay consistent with the same destination and helper text."
    >
      <FieldGrid>
        <TextField label="Eyebrow" value={content.registration.eyebrow} onChange={(value) => updatePath(["registration", "eyebrow"], value)} />
        <TextField
          label="Destination type"
          value={content.registration.destinationType}
          onChange={(value) => updatePath(["registration", "destinationType"], value)}
          helper="Untuk versi ini, biarkan nilai tetap external."
        />
        <TextAreaField label="Title" value={content.registration.title} onChange={(value) => updatePath(["registration", "title"], value)} rows={4} />
        <TextAreaField
          label="Description"
          value={content.registration.description}
          onChange={(value) => updatePath(["registration", "description"], value)}
          rows={4}
        />
        <TextField label="External href" value={content.registration.href} onChange={(value) => updatePath(["registration", "href"], value)} />
        <TextField
          label="Primary label"
          value={content.registration.primaryLabel}
          onChange={(value) => updatePath(["registration", "primaryLabel"], value)}
        />
        <TextField
          label="Secondary label"
          value={content.registration.secondaryLabel}
          onChange={(value) => updatePath(["registration", "secondaryLabel"], value)}
        />
        <TextField
          label="Secondary href"
          value={content.registration.secondaryHref}
          onChange={(value) => updatePath(["registration", "secondaryHref"], value)}
        />
      </FieldGrid>

      <TextAreaField
        label="Helper text"
        value={content.registration.helperText}
        onChange={(value) => updatePath(["registration", "helperText"], value)}
        rows={4}
      />

      <div className="space-y-4">
        {content.registration.steps.map((item, index) => (
          <ArrayItemCard
            key={`${item.title}-${index}`}
            eyebrow={`Registration step ${String(index + 1).padStart(2, "0")}`}
            title={item.title}
            canRemove={content.registration.steps.length > 3}
            onRemove={() => removeItem(["registration", "steps"], index)}
          >
            <TextField label="Title" value={item.title} onChange={(value) => updatePath(["registration", "steps", index, "title"], value)} />
            <TextAreaField
              label="Description"
              value={item.description}
              onChange={(value) => updatePath(["registration", "steps", index, "description"], value)}
              rows={4}
            />
          </ArrayItemCard>
        ))}
        <AddItemButton onClick={() => addItem(["registration", "steps"], templates.registrationStep)}>
          Tambah registration step
        </AddItemButton>
      </div>
    </SectionCard>
  );
}

export function FooterSection({ content, updatePath, addItem, removeItem }: EditorSectionProps) {
  return (
    <SectionCard
      id="footer"
      eyebrow="Footer"
      title="Footer copy and social links"
      description="Treat the footer as the final trust block. Contact details and committee channels should stay current."
    >
      <FieldGrid>
        <TextField label="Contact label" value={content.footer.contactLabel} onChange={(value) => updatePath(["footer", "contactLabel"], value)} />
        <TextField label="Contact value" value={content.footer.contactValue} onChange={(value) => updatePath(["footer", "contactValue"], value)} />
        <TextField label="Social label" value={content.footer.socialLabel} onChange={(value) => updatePath(["footer", "socialLabel"], value)} />
        <TextField
          label="Copyright text"
          value={content.footer.copyrightText}
          onChange={(value) => updatePath(["footer", "copyrightText"], value)}
        />
      </FieldGrid>

      <TextAreaField
        label="Footer description"
        value={content.footer.description}
        onChange={(value) => updatePath(["footer", "description"], value)}
        rows={4}
      />
      <TextAreaField label="Footer note" value={content.footer.note} onChange={(value) => updatePath(["footer", "note"], value)} rows={4} />

      <div className="space-y-4">
        {content.footer.socials.map((item, index) => (
          <ArrayItemCard
            key={`${item.label}-${index}`}
            eyebrow={`Social link ${String(index + 1).padStart(2, "0")}`}
            title={item.label}
            canRemove={content.footer.socials.length > 1}
            onRemove={() => removeItem(["footer", "socials"], index)}
          >
            <FieldGrid>
              <TextField label="Label" value={item.label} onChange={(value) => updatePath(["footer", "socials", index, "label"], value)} />
              <TextField label="URL" value={item.url} onChange={(value) => updatePath(["footer", "socials", index, "url"], value)} type="url" />
            </FieldGrid>
          </ArrayItemCard>
        ))}
        <AddItemButton onClick={() => addItem(["footer", "socials"], templates.socialLink)}>Tambah social link</AddItemButton>
      </div>
    </SectionCard>
  );
}

export function SeoSection({ content, updatePath, handleAssetUpload, uploadingTarget }: EditorSectionProps) {
  return (
    <SectionCard
      id="seo"
      eyebrow="SEO"
      title="Metadata and social share image"
      description="Keep the metadata aligned with the hero message so search and social previews stay coherent."
    >
      <FieldGrid>
        <TextField label="Meta title" value={content.seo.metaTitle} onChange={(value) => updatePath(["seo", "metaTitle"], value)} />
        <TextField label="OG title" value={content.seo.ogTitle} onChange={(value) => updatePath(["seo", "ogTitle"], value)} />
      </FieldGrid>

      <TextAreaField
        label="Meta description"
        value={content.seo.metaDescription}
        onChange={(value) => updatePath(["seo", "metaDescription"], value)}
        rows={4}
      />
      <TextAreaField
        label="OG description"
        value={content.seo.ogDescription}
        onChange={(value) => updatePath(["seo", "ogDescription"], value)}
        rows={4}
      />

      <ImageAssetField
        label="OG image"
        target="seo.ogImage"
        value={content.seo.ogImage}
        onChange={(value) => updatePath(["seo", "ogImage"], value)}
        onUpload={handleAssetUpload}
        uploading={uploadingTarget === "seo.ogImage"}
        helper="If this image is removed, the app can fall back to the generated Open Graph image route."
      />
    </SectionCard>
  );
}
