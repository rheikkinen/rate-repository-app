import { Image, StyleSheet, View } from 'react-native';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  repositoryCard: {
    display: 'flex',
    backgroundColor: 'white',
    gap: 8,
    padding: 12,
  },
  topContent: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  repositoryDetails: {
    display: 'flex',
    flex: 1,
  },
  description: {
    flexWrap: 'wrap',
  },
  bottomContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  countItem: {
    alignItems: 'center',
    display: 'flex',
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    borderRadius: 50,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 8,
  },
});

export const formatCount = (count) => {
  if (count > 1000) {
    const n = (count / 1000.0).toFixed(1);
    return `${n}k`;
  }

  return count;
};

const RepositoryItem = ({ item }) => {
  return (
    <View testID='repositoryItem' style={styles.repositoryCard}>
      <View style={styles.topContent}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.repositoryDetails}>
          <Text fontWeight={'bold'} fontSize={'subheading'}>
            {item.fullName}
          </Text>
          <Text style={styles.description} color={'textSecondary'}>
            {item.description}
          </Text>
          <Text style={styles.languageTag}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.bottomContent}>
        <View testID='stargazersCount' style={styles.countItem}>
          <Text fontWeight={'bold'}>{formatCount(item.stargazersCount)}</Text>
          <Text color={'textSecondary'}>Stars</Text>
        </View>
        <View testID='forksCount' style={styles.countItem}>
          <Text fontWeight={'bold'}>{formatCount(item.forksCount)}</Text>
          <Text color={'textSecondary'}>Forks</Text>
        </View>
        <View testID='reviewCount' style={styles.countItem}>
          <Text fontWeight={'bold'}>{formatCount(item.reviewCount)}</Text>
          <Text color={'textSecondary'}>Reviews</Text>
        </View>
        <View testID='ratingAverage' style={styles.countItem}>
          <Text fontWeight={'bold'}>{item.ratingAverage}</Text>
          <Text color={'textSecondary'}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
