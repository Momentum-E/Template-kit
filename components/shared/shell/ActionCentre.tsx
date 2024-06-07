import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ActionCentreNavigation from './ActionCentreNavigation';

const ActionCentre = () => {
  const { asPath, isReady, query } = useRouter();
  const [activePathname, setActivePathname] = useState<null | string>(null);

  const { slug } = query as { slug: string };

  useEffect(() => {
    if (isReady && asPath) {
      const activePathname = new URL(asPath, location.href).pathname;
      setActivePathname(activePathname);
    }
  }, [asPath, isReady]);

  return (
    <div className='flex flex-1 flex-col'>
      <hr className='border-1 mb-2'></hr>
      <ActionCentreNavigation activePathname={activePathname} />
    </div>
  );
};

export default ActionCentre;
