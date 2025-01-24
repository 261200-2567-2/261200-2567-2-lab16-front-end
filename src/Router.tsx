import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import Todos from './pages/Todos/Todos';
import TodoProvider from './providers/TodoProvider';
import Search from './pages/Search/Search';
import Error404 from './pages/Error404';
import HttpClientProvider from './providers/HttpClientProvider';

const providersGiver = ([...providers]: (({
  children,
}: {
  children: React.ReactNode;
}) => JSX.Element)[]) => {
  return providers.reduceRight(
    (children, Provider) => <Provider>{children}</Provider>,
    <Outlet />,
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={providersGiver([HttpClientProvider, TodoProvider])}>
          <Route path="/" element={<Todos />} />
        </Route>
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
