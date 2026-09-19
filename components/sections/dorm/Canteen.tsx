"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { dormCopy, mealLabels, menu, type Meal } from "@/data/dorm";
import { images } from "@/lib/images";
import { pick } from "@/lib/utils";
import { Photo } from "@/components/ui/Photo";
import { TabList, TabPanel } from "@/components/ui/Tabs";

const meals: Meal[] = ["breakfast", "lunch", "snack", "dinner"];

export function Canteen() {
  const locale = useLocale();
  const c = dormCopy.canteen;
  const [day, setDay] = useState(menu[0].id);
  const current = menu.find((d) => d.id === day) ?? menu[0];

  return (
    <section aria-labelledby="dorm-canteen" className="py-20 lg:py-32">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="dorm-canteen" className="text-display-m text-ink">
            {pick(c.title, locale)}
          </h2>
          <p className="text-ink-2 mt-4 max-w-[44ch]">{pick(c.lead, locale)}</p>
          <div className="relative mt-10 hidden pr-14 pb-14 sm:block">
            <Photo
              slot={images.dorm.canteen}
              sizes="(min-width: 1024px) 420px, 70vw"
              className="aspect-[4/3] rounded-[6px]"
            />
            <div className="absolute right-0 bottom-0 w-[44%]">
              <Photo
                slot={images.dorm.meal}
                sizes="(min-width: 1024px) 200px, 40vw"
                className="border-paper aspect-square rounded-full border-[6px]"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <TabList
            idBase="dorm-menu"
            label={pick(c.tabsLabel, locale)}
            value={day}
            onChange={setDay}
            className="-mx-1 px-1"
            tabs={menu.map((d) => ({
              id: d.id,
              label: (
                <>
                  <span aria-hidden="true">{pick(d.short, locale)}</span>
                  <span className="sr-only">{pick(d.long, locale)}</span>
                </>
              ),
            }))}
          />
          <TabPanel
            idBase="dorm-menu"
            id={current.id}
            className="glass mt-6 rounded-[20px] p-5 sm:p-8"
          >
            <p className="text-display-s text-ink font-semibold">{pick(current.long, locale)}</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.dl
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="divide-line mt-4 divide-y"
              >
                {meals.map((m) => (
                  <div key={m} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="flex items-baseline gap-3 sm:block">
                      <span className="text-ink font-semibold">{pick(mealLabels[m], locale)}</span>
                      <span className="text-ink-3 text-sm tabular-nums sm:block">{mealLabels[m].time}</span>
                    </dt>
                    <dd>
                      <ul className="text-ink-2 flex flex-wrap gap-x-5 gap-y-1">
                        {current.meals[m].map((dish, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span aria-hidden="true" className="border-orange size-1.5 rounded-full border" />
                            {pick(dish, locale)}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </motion.dl>
            </AnimatePresence>
          </TabPanel>
          <p className="text-ink-3 mt-5 max-w-[60ch] text-sm">{pick(c.note, locale)}</p>
        </div>
      </div>
    </section>
  );
}
