import { AudioLines, Footprints, Gift, Map } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import type { ActivityItem } from "@/lib/site-schema";

type ActivitiesSectionProps = {
  activities: ActivityItem[];
};

const activityIcons = [Footprints, AudioLines, Map, Gift] as const;

export function ActivitiesSection({ activities }: ActivitiesSectionProps) {
  return (
    <section id="aktivitas" className="section-anchor bg-white/65 py-20 md:py-24">
      <div className="section-shell space-y-10">
        <SectionHeading
          eyebrow="Aktivitas acara"
          title="Lebih ramai dari sekadar lari pagi biasa."
          description="Setiap aktivitas dipilih untuk membuat event terasa lebih hidup, lebih interaktif, dan lebih layak dibagikan bersama teman."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {activities.map((activity, index) => {
            const Icon = activityIcons[index] ?? Footprints;
            const number = String(index + 1).padStart(2, "0");

            return (
              <article
                key={`${activity.title}-${index}`}
                className="card-sheen surface-outline rounded-[30px] bg-brand-cream p-6 transition duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <Icon className="size-7 text-brand-coral" />
                  <span className="text-sm font-semibold text-brand-stone">{number}</span>
                </div>
                <h3 className="mt-12 text-2xl font-bold text-brand-ink">{activity.title}</h3>
                <p className="mt-4 text-sm leading-7 text-brand-stone">{activity.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
