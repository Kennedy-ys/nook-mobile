import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useAppTheme } from '../../theme/useAppTheme';
import { SettingsBackground } from './SettingsBackground';
import { SettingsHeader } from './SettingsHeader';
import { IslandPreviewCard } from './IslandPreviewCard';

type PreviewVariant = React.ComponentProps<typeof IslandPreviewCard>['variant'];

type SettingsPageProps = {
  title: string;
  /** Which island preview to show under the header. Omit for none. */
  preview?: PreviewVariant;
  /** Root page has no back arrow. Defaults to true. */
  showBack?: boolean;
  onBack?: () => void;
  /** e.g. theme toggle + close buttons on the root page. */
  headerRight?: React.ReactNode;
  /** Defaults to the "Test build" label; pass null to hide. */
  footer?: React.ReactNode | null;
  children: React.ReactNode;
};

export function SettingsPage({
  title,
  preview,
  showBack = true,
  onBack = () => router.back(),
  headerRight,
  footer,
  children,
}: SettingsPageProps) {
  const { colors, isDark } = useAppTheme();
  const header = <SettingsHeader title={title} onBack={showBack ? onBack : undefined} />;

  return (
    <SettingsBackground>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {headerRight ? (
            <View style={styles.headerRow}>
              {header}
              <View style={styles.headerRight}>{headerRight}</View>
            </View>
          ) : (
            header
          )}

          {preview && <IslandPreviewCard variant={preview} />}

          {children}

          {footer === undefined ? (
            <Text style={[styles.footer, { color: colors.subtext }]}>Test build</Text>
          ) : (
            footer
          )}
        </ScrollView>
      </SafeAreaView>
    </SettingsBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { paddingBottom: 40 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerRight: { flexDirection: 'row', alignItems: 'center', paddingRight: 20, gap: 10 },
  footer: { textAlign: 'center', fontSize: 12, marginTop: 24 },
});