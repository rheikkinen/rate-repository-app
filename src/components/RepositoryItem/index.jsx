import { Image, Linking, StyleSheet, View } from 'react-native';
import theme from '../../theme';
import Button from '../Button';
import Text from '../Text';

const styles = StyleSheet.create({
  repositoryCard: {
    display: 'flex',
    backgroundColor: 'white',
    gap: 4,
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
    gap: 16,
  },
  counts: {
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

const RepositoryItem = ({ item, showButton = false }) => {
  return (
    <View testID='repositoryItem' style={styles.repositoryCard}>
      <View style={styles.topContent}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.repositoryDetails}>
          <Text fontWeight={'bold'} fontSize={'subheading'}>
            {item.fullName}
          </Text>
          <Text style={styles.description} color={'textSecondary'}>
            {item.description || 'No description'}
          </Text>
          <Text style={styles.languageTag}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.bottomContent}>
        <View style={styles.counts}>
          <View testID='stargazersCount' style={styles.countItem}>
            <Text fontWeight={'bold'} fontSize={'subheading'}>
              {formatCount(item.stargazersCount)}
            </Text>
            <Text color={'textSecondary'} fontSize={'subheading'}>
              Stars
            </Text>
          </View>
          <View testID='forksCount' style={styles.countItem}>
            <Text fontWeight={'bold'} fontSize={'subheading'}>
              {formatCount(item.forksCount)}
            </Text>
            <Text color={'textSecondary'} fontSize={'subheading'}>
              Forks
            </Text>
          </View>
          <View testID='reviewCount' style={styles.countItem}>
            <Text fontWeight={'bold'} fontSize={'subheading'}>
              {formatCount(item.reviewCount)}
            </Text>
            <Text color={'textSecondary'} fontSize={'subheading'}>
              Reviews
            </Text>
          </View>
          <View testID='ratingAverage' style={styles.countItem}>
            <Text fontWeight={'bold'} fontSize={'subheading'}>
              {item.ratingAverage}
            </Text>
            <Text color={'textSecondary'} fontSize={'subheading'}>
              Rating
            </Text>
          </View>
        </View>
        {showButton && (
          <Button onPress={() => Linking.openURL(item.url)}>
            Open in GitHub
          </Button>
        )}
      </View>
    </View>
  );
};

export default RepositoryItem;
