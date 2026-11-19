import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, type Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useAppTheme } from '../../theme/useAppTheme';
import { triggerHaptic } from '../../utils/haptics';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { SettingsGroupCard, SettingsDivider } from '../../components/settings/SettingsGroupCard';
import { GlassCard } from '../../components/settings/GlassCard';

const MENU_ITEMS: { href: Href; title: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { href: '/settings/general', title: 'General', icon: 'sunny-outline' },
  { href: '/settings/island', title: 'Island', icon: 'browsers-outline' },
  { href: '/settings/appearance', title: 'Appearance', icon: 'brush-outline' },
  { href: '/settings/motion', title: 'Motion', icon: 'sparkles-outline' },
  { href: '/settings/sound', title: 'Sound & keys', icon: 'volume-high-outline' },
  { href: '/settings/weather', title: 'Weather', icon: 'moon-outline' },
  { href: '/settings/theme', title: 'Theme', icon: 'color-palette-outline' },
  { href: '/settings/about', title: 'About', icon: 'information-circle-outline' },
];

export default function SettingsIndex() {
  const { colors } = useAppTheme();
  const computerName = useSettingsStore((s) => s.computerName);
  const isConnected = useSettingsStore((s) => s.isConnected);

  const go = (href: Href) => {
    triggerHaptic('selection');
    router.push(href);
  };

  return (
    <SettingsPage
      title="Settings"
      preview="notch"
      showBack={false}
      headerRight={
        <IconButton label="Close settings" icon="close" onPress={() => router.back()} />
      }
    >
      <GlassCard
        onPress={() => go('/settings/connection')}
        accessibilityLabel={`${computerName}, ${isConnected ? 'connected' : 'disconnected'}`}
        accessibilityHint="Opens connection settings"
        style={{ marginBottom: 16 }}
      >
        <View style={styles.computerRow}>
          <View style={styles.computerIconTile}>
            <Ionicons
              name="desktop-outline"
              size={20}
              color="#2FBF5B"
            />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={[styles.computerName, { color: colors.text }]}>{computerName}</Text>
            <View style={styles.connectedRow}>
              <View
                style={[
                  styles.connectedDot,
                  { backgroundColor: isConnected ? '#2FBF5B' : '#FF9F0A' },
                ]}
              />
              <Text style={{ color: colors.subtext, fontSize: 13 }}>
                {isConnected ? 'Connected' : 'Disconnected'}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.subtext} />
        </View>
      </GlassCard>

      <SettingsGroupCard>
        {MENU_ITEMS.map((item, i) => (
          <React.Fragment key={item.title}>
            {i > 0 && <SettingsDivider />}
            <Pressable
              onPress={() => go(item.href)}
              accessibilityRole="button"
              accessibilityLabel={item.title}
              style={({ pressed }) => [styles.menuRow, pressed && { opacity: 0.7 }]}
            >
              <Ionicons name={item.icon} size={20} color={colors.text} />
              <Text style={[styles.menuTitle, { color: colors.text }]}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.subtext} />
            </Pressable>
          </React.Fragment>
        ))}
      </SettingsGroupCard>
    </SettingsPage>
  );
}

function IconButton({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  const { colors } = useAppTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      style={[styles.iconBtn, { backgroundColor: colors.glass, borderColor: colors.border }]}
    >
      <Ionicons name={icon} size={18} color={colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  computerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  computerIconTile: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(47, 191, 91, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  computerName: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  connectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  connectedDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 18,
    gap: 14,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
