import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../theme';
import { lightColors, palette } from '../tokens/colors';

export function TokensStory() {
  const { colors, space, textStyles, radii, shadows } = useTheme();

  const colorEntries = Object.entries(colors) as [keyof typeof lightColors, string][];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bgPrimary }}
      contentContainerStyle={styles.container}
    >
      <Text style={[textStyles.headingMD, { color: colors.textPrimary, marginBottom: space.md }]}>
        Color Tokens
      </Text>

      {colorEntries
        .filter(([, v]) => typeof v === 'string' && v !== 'transparent')
        .map(([key, value]) => (
          <View key={key} style={[styles.colorRow, { marginBottom: space.xs }]}>
            <View
              style={[
                styles.colorSwatch,
                {
                  backgroundColor: value as string,
                  borderRadius: radii.sm,
                  borderWidth: 1,
                  borderColor: colors.borderDefault,
                },
              ]}
            />
            <View style={{ marginLeft: space.sm }}>
              <Text style={[textStyles.labelMD, { color: colors.textPrimary }]}>{key}</Text>
              <Text style={[textStyles.captionSM, { color: colors.textTertiary }]}>
                {value as string}
              </Text>
            </View>
          </View>
        ))}

      {/* Spacing */}
      <Text style={[textStyles.headingMD, { color: colors.textPrimary, marginTop: space.xl, marginBottom: space.md }]}>
        Spacing (4pt grid)
      </Text>
      {Object.entries(space).map(([key, value]) => (
        <View key={key} style={[styles.spacingRow, { marginBottom: space.xs }]}>
          <Text style={[textStyles.captionMD, { color: colors.textSecondary, width: 48 }]}>
            {key}
          </Text>
          <View
            style={[
              styles.spacingBar,
              { width: value as number, backgroundColor: colors.interactivePrimary },
            ]}
          />
          <Text style={[textStyles.captionSM, { color: colors.textTertiary, marginLeft: space.sm }]}>
            {value}px
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  colorRow: { flexDirection: 'row', alignItems: 'center' },
  colorSwatch: { width: 32, height: 32 },
  spacingRow: { flexDirection: 'row', alignItems: 'center' },
  spacingBar: { height: 8, borderRadius: 4 },
});
