import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../theme';
import { Badge, NotificationDot } from '../components/atoms/Badge';
import { Card } from '../components/atoms/Card';
import { Divider } from '../components/atoms/Divider';
import { Input } from '../components/atoms/Input';
import { ListItem } from '../components/molecules/ListItem';
import { MessageBubble } from '../components/molecules/MessageBubble';
import { ChannelList, Channel } from '../components/organisms/ChannelList';
import { Header } from '../components/organisms/Header';
import { BottomSheet } from '../components/organisms/BottomSheet';
import { ActionSheet } from '../components/organisms/ActionSheet';
import { Button } from '../components/atoms/Button';

const DEMO_CHANNELS: Channel[] = [
  { id: '1', name: 'general', subtitle: 'Welcome to the team!', timestamp: '12:34', unreadCount: 3 },
  { id: '2', name: 'random', subtitle: 'Has anyone seen my standup notes?', timestamp: '11:00', isMuted: true },
  { id: '3', name: 'design', subtitle: 'New Figma file dropped 🎨', timestamp: '09:15' },
];

const DEMO_DMS: Channel[] = [
  { id: 'd1', name: 'Alice Johnson', subtitle: 'Sounds good, thanks!', timestamp: '13:01', isDM: true, presence: 'online', unreadCount: 1 },
  { id: 'd2', name: 'Bob Smith', subtitle: 'Will review tomorrow', timestamp: 'Yesterday', isDM: true, presence: 'away' },
];

export function ComponentsStory() {
  const { colors, space, textStyles } = useTheme();
  const [inputVal, setInputVal] = useState('');
  const [showSheet, setShowSheet] = useState(false);
  const [showAction, setShowAction] = useState(false);

  const section = (title: string) => (
    <Text
      style={[
        textStyles.labelMD,
        { color: colors.textSecondary, marginTop: space.lg, marginBottom: space.sm },
      ]}
    >
      {title}
    </Text>
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bgPrimary }}
      contentContainerStyle={styles.container}
    >
      {/* Header */}
      {section('HEADER')}
      <Header
        title="# general"
        subtitle="42 members"
        leftAction={{ label: 'Back', onPress: () => {} }}
        rightActions={[{ label: 'Search', onPress: () => {} }]}
      />

      {/* Badges */}
      {section('BADGES')}
      <View style={styles.row}>
        {(['default', 'success', 'warning', 'danger', 'info', 'neutral'] as const).map((v) => (
          <Badge key={v} label={v} variant={v} style={{ marginRight: space.xs }} />
        ))}
      </View>
      <View style={[styles.row, { marginTop: space.sm }]}>
        <Badge count={5} style={{ marginRight: space.sm }} />
        <Badge count={100} style={{ marginRight: space.sm }} />
        <NotificationDot style={{ marginRight: space.sm }} />
        <Badge dot variant="success" />
      </View>

      {/* Dividers */}
      {section('DIVIDERS')}
      <Divider />
      <Divider label="Today" style={{ marginVertical: space.sm }} />

      {/* Card */}
      {section('CARD')}
      <Card elevation="md">
        <Text style={[textStyles.bodyMD, { color: colors.textPrimary }]}>
          This is a Card with elevation="md". It picks up shadows automatically.
        </Text>
      </Card>

      {/* Input */}
      {section('INPUT')}
      <Input
        label="Message"
        placeholder="Type a message…"
        value={inputVal}
        onChangeText={setInputVal}
        clearable
      />
      <Input
        label="Required field"
        placeholder="Enter value…"
        errorText="This field is required"
        style={{ marginTop: space.sm }}
      />

      {/* List items */}
      {section('LIST ITEMS')}
      <ListItem
        title="# general"
        subtitle="Welcome to the team!"
        timestamp="12:34"
        unreadCount={3}
        onPress={() => {}}
      />
      <ListItem
        title="Alice Johnson"
        subtitle="Sounds good!"
        timestamp="13:01"
        avatarName="Alice Johnson"
        presence="online"
        onPress={() => {}}
      />

      {/* Messages */}
      {section('MESSAGE BUBBLES')}
      <MessageBubble
        message="Hey team! Has anyone reviewed the latest PR?"
        senderName="Alice"
        timestamp="12:30"
        variant="received"
      />
      <MessageBubble
        message="On it! Looks good so far."
        senderName="Me"
        timestamp="12:31"
        variant="sent"
      />
      <MessageBubble
        message="This message has emoji reactions 🎉"
        senderName="Bob"
        timestamp="12:32"
        variant="received"
        reactions={[{ emoji: '👍', count: 3 }, { emoji: '🎉', count: 1 }]}
      />

      {/* Channel list */}
      {section('CHANNEL LIST')}
      <ChannelList channels={DEMO_CHANNELS} sectionTitle="Channels" selectedId="1" />
      <ChannelList channels={DEMO_DMS} sectionTitle="Direct Messages" style={{ marginTop: space.sm }} />

      {/* Overlays */}
      {section('OVERLAYS')}
      <View style={styles.row}>
        <Button label="Bottom Sheet" onPress={() => setShowSheet(true)} style={{ marginRight: space.sm }} />
        <Button label="Action Sheet" variant="secondary" onPress={() => setShowAction(true)} />
      </View>

      <BottomSheet visible={showSheet} onClose={() => setShowSheet(false)} title="Settings" snapHeight="40%">
        <Text style={[textStyles.bodyMD, { color: colors.textPrimary }]}>
          Bottom sheet content goes here.
        </Text>
      </BottomSheet>

      <ActionSheet
        visible={showAction}
        onClose={() => setShowAction(false)}
        title="Message Options"
        actions={[
          { label: 'Reply in thread', onPress: () => {} },
          { label: 'Copy link', onPress: () => {} },
          { label: 'Delete message', onPress: () => {}, destructive: true },
        ]}
      />

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 32 },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingHorizontal: 16 },
});
