'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function ApplyRedirectContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const pathway = searchParams.get('pathway') || 'pathway-1-foundation';
    let targetPathway = 'pathway-1-foundation';

    if (pathway === 'practical-confinement-care' || pathway === 'pathway-2-practical') {
      targetPathway = 'pathway-2-practical';
    } else if (pathway === 'foundation-confinement-care' || pathway === 'pathway-1-foundation') {
      targetPathway = 'pathway-1-foundation';
    } else if (pathway === 'experienced' || pathway === 'pathway-3-experienced') {
      targetPathway = 'pathway-3-experienced';
    } else if (pathway === 'certified' || pathway === 'pathway-4-certified') {
      targetPathway = 'pathway-4-certified';
    } else {
      targetPathway = pathway;
    }

    window.location.replace(`/careers?pathway=${targetPathway}#apply-wizard`);
  }, [searchParams]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center bg-[#FAF5ED] text-[#33272A] p-8">
      <div className="w-8 h-8 border-3 border-[#651F32] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-sm font-medium">Redirecting to application form...</p>
    </div>
  );
}

export default function CareersApplyRedirect() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center bg-[#FAF5ED] text-[#33272A]">
        <p className="text-sm">Loading...</p>
      </div>
    }>
      <ApplyRedirectContent />
    </Suspense>
  );
}
