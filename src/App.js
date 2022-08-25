import { Suspense, lazy, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';

const HomeView = lazy(() =>
  import('./views/HomeView/HomeView' /* webpackChunkName: "home-view" */)
);

const MoviesView = lazy(() =>
  import('./views/MoviesView/MoviesView' /* webpackChunkName: "movies-view" */)
);

const MovieDetailsView = lazy(() =>
  import(
    './views/MovieDetailsView/MovieDetailsView' /* webpackChunkName: "movie-details-view" */
  )
);

export const App = () => {
  const [search, setSearch] = useState('');
  return (
    <>
      <AppBar />
      <Container>
        <Suspense fallback={<h1>LOADING THE ROUTE...</h1>}>
          <Routes>
            <Route index path="/" element={<HomeView />} />
            <Route path="/movies/:slug/*" element={<MovieDetailsView />} />
            <Route path="/movies" element={<MoviesView setSearch={setSearch} search={search} />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
};

