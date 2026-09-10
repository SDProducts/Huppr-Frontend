"use client";

import * as React from "react";

import CategoryBar from "@/app/(marketing)/resources/_components/CategoryBar";
import EmployerResourcesSection from "@/app/(marketing)/resources/_components/ExploreResources";
import FeaturedSection from "@/app/(marketing)/resources/_components/FeaturedSection";
import FinalCTA from "@/app/(marketing)/resources/_components/FinalCTA";
import HeroSection from "@/app/(marketing)/resources/_components/HeroSection";
import LatestArticlesSection from "@/app/(marketing)/resources/_components/LatestArticles";
import NewsLetter from "@/app/(marketing)/resources/_components/NewsLetter";
import ResourceTabs from "@/app/(marketing)/resources/_components/ResourceTabs";
import LearningSpotlight from "@/app/(marketing)/resources/LearningSpotLight";

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = React.useState("Articles");

  return (
    <>
      <HeroSection />

      <CategoryBar />

      <FeaturedSection />

      <ResourceTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <EmployerResourcesSection />

      <LearningSpotlight />

      <LatestArticlesSection />

      <NewsLetter />

      <FinalCTA />
    </>
  );
}
