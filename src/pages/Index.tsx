
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import MarketSnapshot from '../components/MarketSnapshot';
import IndicesOverview from '../components/IndicesOverview';
import NewsSection from '../components/NewsSection';
import InvestorTools from '../components/InvestorTools';
import ProductOfferings from '../components/ProductOfferings';
import EducationSection from '../components/EducationSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="overflow-x-hidden">
        <HeroSection />
        <MarketSnapshot />
        <IndicesOverview />
        <NewsSection />
        <InvestorTools />
        <ProductOfferings />
        <EducationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
