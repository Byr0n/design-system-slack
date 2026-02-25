import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Avatar } from '../components/atoms/Avatar';
import { useTheme } from '../theme';

export function AvatarStory() {
  const { colors, space, textStyles } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bgPrimary }}
      contentContainerStyle={styles.container}
    >
      <Text style={[textStyles.headingMD, { color: colors.textPrimary, marginBottom: space.md }]}>
        Avatar
      </Text>

      <Text style={[textStyles.labelMD, { color: colors.textSecondary, marginBottom: space.sm }]}>
        SIZES
      </Text>
      <View style={[styles.row, { marginBottom: space.md }]}>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <View key={size} style={[styles.item, { marginRight: space.sm }]}>
            <Avatar name="John Doe" size={size} />
            <Text style={[textStyles.captionSM, { color: colors.textTertiary, marginTop: 4 }]}>
              {size}
            </Text>
          </View>
        ))}
      </View>

      <Text style={[textStyles.labelMD, { color: colors.textSecondary, marginBottom: space.sm }]}>
        PRESENCE
      </Text>
      <View style={[styles.row, { marginBottom: space.md }]}>
        {(['online', 'away', 'dnd', 'offline'] as const).map((presence) => (
          <View key={presence} style={[styles.item, { marginRight: space.md }]}>
            <Avatar name="Alice Smith" presence={presence} />
            <Text style={[textStyles.captionSM, { color: colors.textTertiary, marginTop: 4 }]}>
              {presence}
            </Text>
          </View>
        ))}
      </View>

      <Text style={[textStyles.labelMD, { color: colors.textSecondary, marginBottom: space.sm }]}>
        INITIALS COLORS
      </Text>
      <View style={[styles.row, { marginBottom: space.md }]}>
        {['Alice', 'Bob', 'Carol', 'Dave', 'Eve'].map((name) => (
          <Avatar key={name} name={name} style={{ marginRight: space.sm }} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end' },
  item: { alignItems: 'center' },
});
