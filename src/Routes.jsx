import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import VideoPlayer from './pages/video-player';
import VideoBrowse from './pages/video-browse';
import UserProfileSettings from './pages/user-profile-settings';
import UserRegistration from './pages/user-registration';
import VideoUpload from './pages/video-upload';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/video-player" element={<VideoPlayer />} />
        <Route path="/video-browse" element={<VideoBrowse />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/video-upload" element={<VideoUpload />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
