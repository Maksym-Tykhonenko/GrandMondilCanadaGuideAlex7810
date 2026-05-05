import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

const Grnmdlccanadguiidlay = ({
  children,
  bounces = true,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
  bounces?: boolean;
}) => {
  return (
    <View style={styles.cozyrabtteacorneercontainer}>
      <ScrollView
        bounces={bounces}
        contentContainerStyle={styles.cozyrabtteacorneerscrollContent}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
};

export default Grnmdlccanadguiidlay;

const styles = StyleSheet.create({
  cozyrabtteacorneercontainer: {
    flex: 1,
    backgroundColor: '#0A1810',
  },
  cozyrabtteacorneerscrollContent: {
    flexGrow: 1,
  },
  cozyrabtteacorneerflexFill: {
    flex: 1,
  },
});
