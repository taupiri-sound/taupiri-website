import React from 'react';
import MaintenancePage from '@/components/MaintenancePage/MaintenancePage';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${SITE_CONFIG.ORGANIZATION_NAME} - Coming Soon`,
  description: "We're currently working on something exciting. Check back soon!",
};

const MaintenanceModePage = () => {
  return <MaintenancePage />;
};

export default MaintenanceModePage;
