
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { Database, HardDrive, Loader2 } from "lucide-react";

export const StorageSettings = () => {
  const { preferences, updatePreferences, loading } = useUserPreferences();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="ml-2 text-sm text-gray-500">Loading preferences...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Database className="h-5 w-5 mr-2" />
          Storage Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="storage-mode" className="text-sm font-medium">
              Use Local Storage
            </Label>
            <p className="text-xs text-gray-500">
              Store data locally instead of in your account (data won't sync across devices)
            </p>
          </div>
          <Switch
            id="storage-mode"
            checked={preferences.use_local_storage}
            onCheckedChange={(checked) => updatePreferences({ use_local_storage: checked })}
          />
        </div>
        
        <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded-md">
          <div className="flex items-center mb-2">
            {preferences.use_local_storage ? (
              <HardDrive className="h-4 w-4 mr-2" />
            ) : (
              <Database className="h-4 w-4 mr-2" />
            )}
            <span className="font-medium">
              Currently using: {preferences.use_local_storage ? 'Local Storage' : 'Cloud Storage'}
            </span>
          </div>
          <p>
            {preferences.use_local_storage 
              ? "Data is stored in your browser and won't be accessible from other devices."
              : "Data is securely stored in your account and syncs across all your devices."
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
