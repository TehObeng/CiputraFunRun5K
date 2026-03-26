import {
  AddItemButton,
  ArrayItemCard,
  FieldGrid,
  ImageAssetField,
  SectionCard,
  TextAreaField,
  TextField,
} from "@/components/admin/form-fields";
import type { EditorSectionProps } from "@/components/admin/editor-types";

const templates = {
  navItem: { label: "New item", href: "#overview" },
  heroStat: { label: "New stat", value: "Value", description: "Explain why this number matters." },
  highlight: { label: "New highlight", title: "Highlight title", description: "Describe the proof point." },
  experience: { title: "New experience block", description: "Describe this part of the event." },
  timeline: { time: "07:00", title: "New timeline item", description: "Describe what happens at this point." },
} as const;

export function BrandSection({
  content,
  updatePath,
  addItem,
  removeItem,
  handleAssetUpload,
  uploadingTarget,
}: EditorSectionProps) {
  return (
    <SectionCard
      id="brand"
      eyebrow="Brand"
      title="Brand, navigation, and top announcement"
      description="These fields control the main event identity and the content that lives above the fold."
    >
      <FieldGrid>
        <TextField label="Brand eyebrow" value={content.brand.eyebrow} onChange={(value) => updatePath(["brand", "eyebrow"], value)} />
        <TextField label="Event name" value={content.brand.name} onChange={(value) => updatePath(["brand", "name"], value)} />
        <TextField label="Tagline" value={content.brand.tagline} onChange={(value) => updatePath(["brand", "tagline"], value)} />
        <TextField
          label="Location label"
          value={content.brand.locationLabel}
          onChange={(value) => updatePath(["brand", "locationLabel"], value)}
        />
      </FieldGrid>

      <ImageAssetField
        label="Brand logo"
        target="brand.logo"
        value={content.brand.logo}
        onChange={(value) => updatePath(["brand", "logo"], value)}
        onUpload={handleAssetUpload}
        uploading={uploadingTarget === "brand.logo"}
        helper="This image appears in the navbar, hero, and footer."
      />

      <FieldGrid>
        <TextField label="Announcement label" value={content.announcement.label} onChange={(value) => updatePath(["announcement", "label"], value)} />
        <TextField
          label="Announcement CTA label"
          value={content.announcement.linkLabel}
          onChange={(value) => updatePath(["announcement", "linkLabel"], value)}
        />
      </FieldGrid>

      <FieldGrid>
        <TextAreaField
          label="Announcement text"
          value={content.announcement.text}
          onChange={(value) => updatePath(["announcement", "text"], value)}
          rows={4}
        />
        <TextField
          label="Announcement CTA href"
          value={content.announcement.linkHref}
          onChange={(value) => updatePath(["announcement", "linkHref"], value)}
        />
      </FieldGrid>

      <div className="space-y-4">
        {content.brand.navItems.map((item, index) => (
          <ArrayItemCard
            key={`${item.label}-${index}`}
            eyebrow={`Nav item ${String(index + 1).padStart(2, "0")}`}
            title={item.label}
            canRemove={content.brand.navItems.length > 3}
            onRemove={() => removeItem(["brand", "navItems"], index)}
          >
            <FieldGrid>
              <TextField label="Label" value={item.label} onChange={(value) => updatePath(["brand", "navItems", index, "label"], value)} />
              <TextField label="Href" value={item.href} onChange={(value) => updatePath(["brand", "navItems", index, "href"], value)} />
            </FieldGrid>
          </ArrayItemCard>
        ))}
        <AddItemButton onClick={() => addItem(["brand", "navItems"], templates.navItem)}>Tambah nav item</AddItemButton>
      </div>
    </SectionCard>
  );
}

export function HeroSection({ content, updatePath, addItem, removeItem }: EditorSectionProps) {
  return (
    <SectionCard
      id="hero"
      eyebrow="Hero"
      title="Main conversion message and supporting stats"
      description="Keep the hero clean, direct, and mobile-readable. Every supporting block here is visible on the public homepage."
    >
      <FieldGrid>
        <TextField label="Hero badge" value={content.hero.badge} onChange={(value) => updatePath(["hero", "badge"], value)} />
        <TextField
          label="Primary CTA label"
          value={content.hero.primaryCtaLabel}
          onChange={(value) => updatePath(["hero", "primaryCtaLabel"], value)}
        />
        <TextAreaField label="Hero title" value={content.hero.title} onChange={(value) => updatePath(["hero", "title"], value)} rows={4} />
        <TextAreaField
          label="Hero description"
          value={content.hero.description}
          onChange={(value) => updatePath(["hero", "description"], value)}
          rows={5}
        />
        <TextField
          label="Secondary CTA label"
          value={content.hero.secondaryCtaLabel}
          onChange={(value) => updatePath(["hero", "secondaryCtaLabel"], value)}
        />
        <TextField
          label="Secondary CTA href"
          value={content.hero.secondaryCtaHref}
          onChange={(value) => updatePath(["hero", "secondaryCtaHref"], value)}
        />
        <TextField
          label="Supporting label"
          value={content.hero.supportingLabel}
          onChange={(value) => updatePath(["hero", "supportingLabel"], value)}
        />
        <TextField
          label="Supporting title"
          value={content.hero.supportingTitle}
          onChange={(value) => updatePath(["hero", "supportingTitle"], value)}
        />
      </FieldGrid>

      <TextAreaField
        label="Supporting description"
        value={content.hero.supportingDescription}
        onChange={(value) => updatePath(["hero", "supportingDescription"], value)}
        rows={4}
      />

      <div className="space-y-4">
        {content.hero.stats.map((stat, index) => (
          <ArrayItemCard
            key={`${stat.label}-${index}`}
            eyebrow={`Hero stat ${String(index + 1).padStart(2, "0")}`}
            title={stat.label}
            canRemove={content.hero.stats.length > 3}
            onRemove={() => removeItem(["hero", "stats"], index)}
          >
            <FieldGrid>
              <TextField label="Label" value={stat.label} onChange={(value) => updatePath(["hero", "stats", index, "label"], value)} />
              <TextField label="Value" value={stat.value} onChange={(value) => updatePath(["hero", "stats", index, "value"], value)} />
            </FieldGrid>
            <TextAreaField
              label="Description"
              value={stat.description}
              onChange={(value) => updatePath(["hero", "stats", index, "description"], value)}
              rows={4}
            />
          </ArrayItemCard>
        ))}
        <AddItemButton onClick={() => addItem(["hero", "stats"], templates.heroStat)}>Tambah hero stat</AddItemButton>
      </div>
    </SectionCard>
  );
}

export function OverviewSection({ content, updatePath, addItem, removeItem }: EditorSectionProps) {
  return (
    <SectionCard
      id="overview"
      eyebrow="Overview"
      title="First supporting explanation block"
      description="This section should explain the event promise and the strongest high-level proof points."
    >
      <FieldGrid>
        <TextField label="Eyebrow" value={content.overview.eyebrow} onChange={(value) => updatePath(["overview", "eyebrow"], value)} />
        <TextAreaField label="Title" value={content.overview.title} onChange={(value) => updatePath(["overview", "title"], value)} rows={4} />
      </FieldGrid>
      <TextAreaField
        label="Description"
        value={content.overview.description}
        onChange={(value) => updatePath(["overview", "description"], value)}
        rows={4}
      />
      <div className="space-y-4">
        {content.overview.highlights.map((item, index) => (
          <ArrayItemCard
            key={`${item.title}-${index}`}
            eyebrow={`Highlight ${String(index + 1).padStart(2, "0")}`}
            title={item.title}
            canRemove={content.overview.highlights.length > 3}
            onRemove={() => removeItem(["overview", "highlights"], index)}
          >
            <FieldGrid>
              <TextField label="Kicker" value={item.label} onChange={(value) => updatePath(["overview", "highlights", index, "label"], value)} />
              <TextField label="Title" value={item.title} onChange={(value) => updatePath(["overview", "highlights", index, "title"], value)} />
            </FieldGrid>
            <TextAreaField
              label="Description"
              value={item.description}
              onChange={(value) => updatePath(["overview", "highlights", index, "description"], value)}
              rows={4}
            />
          </ArrayItemCard>
        ))}
        <AddItemButton onClick={() => addItem(["overview", "highlights"], templates.highlight)}>Tambah highlight</AddItemButton>
      </div>
    </SectionCard>
  );
}

export function ExperienceSection({ content, updatePath, addItem, removeItem }: EditorSectionProps) {
  return (
    <SectionCard
      id="experience"
      eyebrow="Experience"
      title="Activity and atmosphere section"
      description="Each block should explain a distinct part of the event experience, not repeat the same claim."
    >
      <FieldGrid>
        <TextField label="Eyebrow" value={content.experience.eyebrow} onChange={(value) => updatePath(["experience", "eyebrow"], value)} />
        <TextAreaField label="Title" value={content.experience.title} onChange={(value) => updatePath(["experience", "title"], value)} rows={4} />
      </FieldGrid>
      <TextAreaField
        label="Description"
        value={content.experience.description}
        onChange={(value) => updatePath(["experience", "description"], value)}
        rows={4}
      />
      <div className="space-y-4">
        {content.experience.items.map((item, index) => (
          <ArrayItemCard
            key={`${item.title}-${index}`}
            eyebrow={`Experience item ${String(index + 1).padStart(2, "0")}`}
            title={item.title}
            canRemove={content.experience.items.length > 3}
            onRemove={() => removeItem(["experience", "items"], index)}
          >
            <TextField label="Title" value={item.title} onChange={(value) => updatePath(["experience", "items", index, "title"], value)} />
            <TextAreaField
              label="Description"
              value={item.description}
              onChange={(value) => updatePath(["experience", "items", index, "description"], value)}
              rows={4}
            />
          </ArrayItemCard>
        ))}
        <AddItemButton onClick={() => addItem(["experience", "items"], templates.experience)}>Tambah experience item</AddItemButton>
      </div>
    </SectionCard>
  );
}

export function TimelineSection({ content, updatePath, addItem, removeItem }: EditorSectionProps) {
  return (
    <SectionCard
      id="timeline"
      eyebrow="Timeline"
      title="Run-day schedule block"
      description="Keep this section operational and easy to scan. Visitors should understand the event flow at a glance."
    >
      <FieldGrid>
        <TextField label="Eyebrow" value={content.timeline.eyebrow} onChange={(value) => updatePath(["timeline", "eyebrow"], value)} />
        <TextAreaField label="Title" value={content.timeline.title} onChange={(value) => updatePath(["timeline", "title"], value)} rows={4} />
      </FieldGrid>
      <TextAreaField
        label="Description"
        value={content.timeline.description}
        onChange={(value) => updatePath(["timeline", "description"], value)}
        rows={4}
      />
      <div className="space-y-4">
        {content.timeline.items.map((item, index) => (
          <ArrayItemCard
            key={`${item.time}-${index}`}
            eyebrow={`Timeline item ${String(index + 1).padStart(2, "0")}`}
            title={item.title}
            canRemove={content.timeline.items.length > 3}
            onRemove={() => removeItem(["timeline", "items"], index)}
          >
            <FieldGrid>
              <TextField label="Time" value={item.time} onChange={(value) => updatePath(["timeline", "items", index, "time"], value)} />
              <TextField label="Title" value={item.title} onChange={(value) => updatePath(["timeline", "items", index, "title"], value)} />
            </FieldGrid>
            <TextAreaField
              label="Description"
              value={item.description}
              onChange={(value) => updatePath(["timeline", "items", index, "description"], value)}
              rows={4}
            />
          </ArrayItemCard>
        ))}
        <AddItemButton onClick={() => addItem(["timeline", "items"], templates.timeline)}>Tambah timeline item</AddItemButton>
      </div>
    </SectionCard>
  );
}
