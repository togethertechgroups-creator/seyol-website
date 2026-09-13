'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { JourneyStage } from '../types';

export interface VisitorJourneyState {
  stage: JourneyStage;
  primaryConcern?: string;
  eddOrBabyAge?: string;
  recommendedServiceIds: string[];
  recommendedClassIds: string[];
  recommendedProductIds: string[];
  setStage: (stage: JourneyStage) => void;
  setPrimaryConcern: (concern: string) => void;
  setEddOrBabyAge: (edd: string) => void;
  updateJourney: (data: Partial<Omit<VisitorJourneyState, 'setStage' | 'setPrimaryConcern' | 'setEddOrBabyAge' | 'updateJourney'>>) => void;
}

const VisitorJourneyContext = createContext<VisitorJourneyState | undefined>(undefined);

export const VisitorJourneyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stage, setStageState] = useState<JourneyStage>('pregnancy');
  const [primaryConcern, setPrimaryConcern] = useState<string>('Postpartum Restorative Recovery & Bath');
  const [eddOrBabyAge, setEddOrBabyAge] = useState<string>('');
  const [recommendedServiceIds, setRecommendedServiceIds] = useState<string[]>(['postpartum-massage-kattu', 'mother-baby-combo', 'infant-massage-bath']);
  const [recommendedClassIds, setRecommendedClassIds] = useState<string[]>(['class-infant-massage', 'class-postpartum-nutrition']);
  const [recommendedProductIds, setRecommendedProductIds] = useState<string[]>(['sey-baby-massage-oil', 'nalangu-maavu', 'maternal-body-butter']);

  useEffect(() => {
    // Dynamically update recommendations when stage changes
    switch (stage) {
      case 'preconception':
        setRecommendedServiceIds(['preconception-wellness', 'fertility-doula-care']);
        setRecommendedClassIds(['class-birth-prep', 'class-fertility-nutrition']);
        setRecommendedProductIds(['maternal-body-butter', 'herbal-bath-tea']);
        break;
      case 'pregnancy':
        setRecommendedServiceIds(['prenatal-massage', 'birth-doula-support', 'lactation-consultation']);
        setRecommendedClassIds(['class-birth-prep', 'class-breastfeeding-masterclass']);
        setRecommendedProductIds(['pregnancy-stretch-oil', 'maternal-body-butter']);
        break;
      case 'birth':
        setRecommendedServiceIds(['birth-doula-support', 'postpartum-massage-kattu']);
        setRecommendedClassIds(['class-birth-prep']);
        setRecommendedProductIds(['sey-baby-massage-oil', 'pregnancy-stretch-oil']);
        break;
      case 'postpartum':
        setRecommendedServiceIds(['postpartum-massage-kattu', 'mother-baby-combo', 'confinement-nanny-247']);
        setRecommendedClassIds(['class-infant-massage', 'class-postpartum-nutrition']);
        setRecommendedProductIds(['sey-baby-massage-oil', 'nalangu-maavu', 'colic-relief-rollon']);
        break;
      case 'newborn':
        setRecommendedServiceIds(['infant-massage-bath', 'mother-baby-combo', 'confinement-nanny-247']);
        setRecommendedClassIds(['class-infant-massage', 'class-baby-sleep-routine']);
        setRecommendedProductIds(['sey-baby-massage-oil', 'nalangu-maavu', 'colic-relief-rollon']);
        break;
      default:
        setRecommendedServiceIds(['postpartum-massage-kattu', 'mother-baby-combo', 'infant-massage-bath']);
        setRecommendedClassIds(['class-infant-massage', 'class-postpartum-nutrition']);
        setRecommendedProductIds(['sey-baby-massage-oil', 'nalangu-maavu']);
        break;
    }
  }, [stage]);

  const setStage = (newStage: JourneyStage) => {
    setStageState(newStage);
  };

  const updateJourney = (data: Partial<Omit<VisitorJourneyState, 'setStage' | 'setPrimaryConcern' | 'setEddOrBabyAge' | 'updateJourney'>>) => {
    if (data.stage) setStageState(data.stage);
    if (data.primaryConcern !== undefined) setPrimaryConcern(data.primaryConcern);
    if (data.eddOrBabyAge !== undefined) setEddOrBabyAge(data.eddOrBabyAge);
    if (data.recommendedServiceIds) setRecommendedServiceIds(data.recommendedServiceIds);
    if (data.recommendedClassIds) setRecommendedClassIds(data.recommendedClassIds);
    if (data.recommendedProductIds) setRecommendedProductIds(data.recommendedProductIds);
  };

  return (
    <VisitorJourneyContext.Provider
      value={{
        stage,
        primaryConcern,
        eddOrBabyAge,
        recommendedServiceIds,
        recommendedClassIds,
        recommendedProductIds,
        setStage,
        setPrimaryConcern,
        setEddOrBabyAge,
        updateJourney,
      }}
    >
      {children}
    </VisitorJourneyContext.Provider>
  );
};

export const useVisitorJourney = () => {
  const context = useContext(VisitorJourneyContext);
  if (!context) {
    throw new Error('useVisitorJourney must be used within a VisitorJourneyProvider');
  }
  return context;
};
