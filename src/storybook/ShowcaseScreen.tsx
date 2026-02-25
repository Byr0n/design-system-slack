/**
 * ShowcaseScreen — master screen that lets you browse all component stories.
 * Use this as the root screen while developing the design system.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../theme';
import { ButtonStory } from './ButtonStory';
import { AvatarStory } from './AvatarStory';
import { TokensStory } from './TokensStory';
import { ComponentsStory } from './ComponentsStory';

const STORIES = [
  { key: 'tokens', label: 'Tokens', Component: TokensStory },
  { key: 'button', label: 'Button', Component: ButtonStory },
  { key: 'avatar', label: 'Avatar', Component: AvatarStory },
  { key: 'components', label: 'All Components', Component: ComponentsStory },
] as const;

type StoryKey = typeof STORIES[number]['key'];

export function ShowcaseScreen() {
  const { colors, space, textStyles, radii } = useTheme();
  const [active, setActive] = useState<StoryKey>('tokens');

  const ActiveComponent = STORIES.find((s) => s.key === active)?.Component ?? TokensStory;

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.bgPrimary }]}>
      {/* Tab bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.tabBar, { borderBottomColor: colors.borderDefault }]}
        contentContainerStyle={{ paddingHorizontal: space.md }}
      >
        {STORIES.map((story) => {
          const isActive = story.key === active;
          return (
            <TouchableOpacity
              key={story.key}
              onPress={() => setActive(story.key)}
              style={[
                styles.tab,
                {
                  paddingHorizontal: space.sm,
                  paddingVertical: space.sm,
                  borderBottomWidth: 2,
                  borderBottomColor: isActive ? colors.interactivePrimary : 'transparent',
                },
              ]}
            >
              <Text
                style={[
                  textStyles.labelMD,
                  { color: isActive ? colors.textBrand : colors.textSecondary },
                ]}
              >
                {story.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Content */}
      <View style={styles.content}>
        <ActiveComponent />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  tabBar: {
    flexGrow: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tab: {
    marginRight: 4,
  },
  content: { flex: 1 },
});
