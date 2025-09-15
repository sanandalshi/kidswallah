import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const UploadZone = ({ onFileSelect, uploadProgress, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const supportedFormats = ['MP4', 'MOV', 'AVI', 'WEBM'];
  const maxFileSize = '500MB';

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    const videoFile = files?.find(file => file?.type?.startsWith('video/'));
    
    if (videoFile) {
      onFileSelect(videoFile);
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-soft-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft">
            <Icon name="Upload" size={20} color="white" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-fluid-lg text-foreground">Upload Your Video</h2>
            <p className="font-caption text-sm text-muted-foreground">Share safe, educational content for children</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        {!isUploading ? (
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              isDragOver 
                ? 'border-primary bg-primary/5 scale-[1.02]' 
                : 'border-border hover:border-primary/50 hover:bg-muted/30'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto">
                <Icon name="VideoIcon" size={32} className="text-primary" />
              </div>
              
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  Drag & drop your video here
                </h3>
                <p className="text-muted-foreground font-caption text-sm mb-4">
                  or click to browse your files
                </p>
                
                <Button
                  variant="default"
                  onClick={openFileDialog}
                  iconName="FolderOpen"
                  iconPosition="left"
                  className="animate-hover-lift"
                >
                  Choose Video File
                </Button>
              </div>
              
              <div className="pt-4 border-t border-border">
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  {supportedFormats?.map((format) => (
                    <span
                      key={format}
                      className="px-3 py-1 bg-success/10 text-success text-xs font-caption rounded-full border border-success/20"
                    >
                      {format}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Maximum file size: {maxFileSize} • Supported formats: {supportedFormats?.join(', ')}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Upload" size={32} className="text-primary animate-pulse" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">Uploading Video...</h3>
              <p className="text-muted-foreground font-caption text-sm">
                Please wait while we securely upload your content
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-caption text-muted-foreground">Progress</span>
                <span className="font-mono font-medium text-foreground">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Estimated time remaining: {Math.max(1, Math.ceil((100 - uploadProgress) / 10))} minutes
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadZone;