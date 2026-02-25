import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from '../components/atoms/Button';
import { useTheme } from '../theme';

export function ButtonStory() {
  const { colors, space, textStyles } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bgPrimary }}
      contentContainerStyle={styles.container}
    >
      <Text style={[textStyles.headingMD, { color: colors.textPrimary, marginBottom: space.md }]}>
        Button
      </Text>

      {/* Variants */}
      <Text style={[textStyles.labelMD, { color: colors.textSecondary, marginBottom: space.sm }]}>
        VARIANTS
      </Text>
      <View style={[styles.row, { marginBottom: space.md }]}>
        <Button label="Primary" variant="primary" style={{ marginRight: space.sm }} />
        <Button label="Secondary" variant="secondary" style={{ marginRight: space.sm }} />
        <Button label="Ghost" variant="ghost" style={{ marginRight: space.sm }} />
        <Button label="Destructive" variant="destructive" />
      </View>

      {/* Sizes */}
      <Text style={[textStyles.labelMD, { color: colors.textSecondary, marginBottom: space.sm }]}>
        SIZES
      </Text>
      <View style={[styles.column, { marginBottom: space.md }]}>
        <Button label="Small" size="sm" style={{ marginBottom: space.sm }} />
        <Button label="Medium" size="md" style={{ marginBottom: space.sm }} />
        <Button label="Large" size="lg" style={{ marginBottom: space.sm }} />
      </View>

      {/* States */}
      <Text style={[textStyles.labelMD, { color: colors.textSecondary, marginBottom: space.sm }]}>
        STATES
      </Text>
      <View style={[styles.row, { marginBottom: space.md }]}>
        <Button label="Disabled" disabled style={{ marginRight: space.sm }} />
        <Button label="Loading" loading style={{ marginRight: space.sm }} />
        <Button label="Full Width" fullWidth />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  column: { alignItems: 'flex-start' },
});
