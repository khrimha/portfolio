"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectFilter } from "./project-filter";
import { BentoCard } from "./bento-card";
import { projects } from "@/data/projects";
import { FilterCategory } from "@/types";

export function WorkSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter(
      (project) => project.role === activeFilter || project.role === "both"
    );
  }, [activeFilter]);

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
            Selected Work
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            A collection of projects spanning product management and engineering,
            showcasing my hybrid approach to building digital products.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <ProjectFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <BentoCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-slate-400">No projects found for this filter.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

