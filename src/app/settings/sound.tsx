import React from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { SettingsGroupCard, SettingsDivider } from '../../components/settings/SettingsGroupCard';
import { SettingsToggleRow } from '../../components/settings/SettingsToggleRow';

export default function SoundSettings() {
  const hideSystemVolumeHUD = useSettingsStore((s) => s.hideSystemVolumeHUD);
  const setHideSystemVolumeHUD = useSettingsStore((s) => s.setHideSystemVolumeHUD);
  const scrollVolumeControl = useSettingsStore((s) => s.scrollVolumeControl);
  const setScrollVolumeControl = useSettingsStore((s) => s.setScrollVolumeControl);

  return (
    <SettingsPage title="Sound & keys" preview="sound">
      <SettingsGroupCard>
        <SettingsToggleRow
          title="Hide the system volume pop-up"
          subtitle="Nook shows the level in the island instead. Volume keys keep working if Nook closes."
          value={hideSystemVolumeHUD}
          onValueChange={setHideSystemVolumeHUD}
        />
        <SettingsDivider />
        <SettingsToggleRow
          title="Scroll over the music to change volume"
          subtitle="Hover the music, then scroll."
          value={scrollVolumeControl}
          onValueChange={setScrollVolumeControl}
        />
      </SettingsGroupCard>
    </SettingsPage>
  );
}
