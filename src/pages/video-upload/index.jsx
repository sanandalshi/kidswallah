import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import UploadZone from './components/UploadZone';
import VideoMetadataForm from './components/VideoMetadataForm';
import ContentGuidelines from './components/ContentGuidelines';
import ThumbnailPreview from './components/ThumbnailPreview';

const VideoUpload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailTime, setThumbnailTime] = useState(5);
  const [uploadStep, setUploadStep] = useState('upload'); // upload, metadata, review

  // Mock user data - in real app, this would come from auth context
  const userData = {
    isAuthenticated: true,
    userRole: 'creator',
    name: 'Sarah Johnson'
  };

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          setUploadStep('metadata');
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const handleMetadataSubmit = async (metadata) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call to save video with metadata
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful upload
      console.log('Video uploaded successfully:', {
        file: selectedFile,
        metadata,
        thumbnailTime
      });
      
      // Navigate to video browse or success page
      navigate('/video-browse', { 
        state: { 
          message: 'Video uploaded successfully! It will be reviewed within 24-48 hours.' 
        }
      });
      
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToUpload = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setUploadStep('upload');
  };

  const getFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Header 
        isAuthenticated={userData?.isAuthenticated}
        userRole={userData?.userRole}
        onAuthToggle={() => {}}
      />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/video-browse')}
                className="animate-hover-lift"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="font-heading font-bold text-fluid-2xl text-foreground">
                  Upload Safe Video Content
                </h1>
                <p className="font-caption text-muted-foreground mt-1">
                  Share educational and entertaining videos for children
                </p>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${
                uploadStep === 'upload' ? 'text-primary' : selectedFile ?'text-success' : 'text-muted-foreground'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  uploadStep === 'upload' ? 'border-primary bg-primary/10' : selectedFile ?'border-success bg-success text-white' : 'border-muted-foreground'
                }`}>
                  {selectedFile && uploadStep !== 'upload' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span className="text-sm font-bold">1</span>
                  )}
                </div>
                <span className="font-caption font-medium">Upload Video</span>
              </div>
              
              <div className={`w-8 h-0.5 ${selectedFile ? 'bg-success' : 'bg-border'}`} />
              
              <div className={`flex items-center space-x-2 ${
                uploadStep === 'metadata' ? 'text-primary' : 
                uploadStep === 'review' ? 'text-success' : 'text-muted-foreground'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  uploadStep === 'metadata' ? 'border-primary bg-primary/10' :
                  uploadStep === 'review' ? 'border-success bg-success text-white' : 'border-muted-foreground'
                }`}>
                  {uploadStep === 'review' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span className="text-sm font-bold">2</span>
                  )}
                </div>
                <span className="font-caption font-medium">Add Details</span>
              </div>
            </div>
          </div>

          {/* Selected File Info */}
          {selectedFile && (
            <div className="mb-6 p-4 bg-success/5 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} color="var(--color-success)" />
                <div className="flex-1">
                  <h3 className="font-caption font-medium text-success">File Selected</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedFile?.name} • {getFileSize(selectedFile?.size)}
                  </p>
                </div>
                {uploadStep !== 'upload' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBackToUpload}
                    iconName="Upload"
                    iconPosition="left"
                  >
                    Change File
                  </Button>
                )}
              </div>
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {uploadStep === 'upload' && (
                <UploadZone
                  onFileSelect={handleFileSelect}
                  uploadProgress={uploadProgress}
                  isUploading={isUploading}
                />
              )}
              
              {uploadStep === 'metadata' && (
                <>
                  <VideoMetadataForm
                    onSubmit={handleMetadataSubmit}
                    isSubmitting={isSubmitting}
                    selectedFile={selectedFile}
                  />
                  
                  <ThumbnailPreview
                    videoFile={selectedFile}
                    thumbnailTime={thumbnailTime}
                    onThumbnailTimeChange={setThumbnailTime}
                  />
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ContentGuidelines />
              
              {/* Upload Statistics */}
              <div className="bg-card border border-border rounded-2xl shadow-soft-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                    <Icon name="BarChart3" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">Your Stats</h3>
                    <p className="font-caption text-sm text-muted-foreground">Content performance</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-caption text-muted-foreground">Videos Uploaded</span>
                    <span className="font-mono font-bold text-foreground">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-caption text-muted-foreground">Total Views</span>
                    <span className="font-mono font-bold text-foreground">2,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-caption text-muted-foreground">Avg. Rating</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning fill-current" />
                      <span className="font-mono font-bold text-foreground">4.8</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="TrendingUp"
                  iconPosition="left"
                  className="mt-4"
                  onClick={() => navigate('/user-profile-settings')}
                >
                  View Analytics
                </Button>
              </div>

              {/* Quick Tips */}
              <div className="bg-card border border-border rounded-2xl shadow-soft-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-warning/20 rounded-xl flex items-center justify-center">
                    <Icon name="Lightbulb" size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">Quick Tips</h3>
                    <p className="font-caption text-sm text-muted-foreground">For better engagement</p>
                  </div>
                </div>
                
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground font-caption">Keep videos under 10 minutes for better attention</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground font-caption">Use bright, colorful thumbnails</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground font-caption">Include educational elements</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground font-caption">Test audio quality before uploading</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoUpload;