import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/components/app-layout';
import { I18nProvider } from '@/i18n/i18n';
import { TodayScreen } from '@/features/today/today-screen';
import { EatScreen } from '@/features/eat/eat-screen';
import { MoveScreen } from '@/features/move/move-screen';
import { HabitsScreen } from '@/features/habits/habits-screen';

export function App() {
  return (
    <I18nProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<TodayScreen />} />
            <Route path="eat" element={<EatScreen />} />
            <Route path="move" element={<MoveScreen />} />
            <Route path="habits" element={<HabitsScreen />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}
