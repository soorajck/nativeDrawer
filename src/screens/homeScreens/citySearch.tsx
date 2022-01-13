import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
  TextInput,
} from 'react-native';
import _ from 'lodash';

type filteredData = {
  title: string;
};

const CitySearch = () => {
  //managing local states
  const [text, onChangeText] = React.useState('');
  const [processedData, setProcessedData] = React.useState<any>([]);

  //data dummy
  const DATA = [
    {
      title: 'Delhi',
      data: ['1,484 km²', '1.9 crores (2012)', '11,312'],
    },
    {
      title: 'Mumbai',
      data: ['1,484 km²', '1.9 crores (2012)', '11,312'],
    },
    {
      title: 'Kerala',
      data: ['1,484 km²', '1.9 crores (2012)', '11,312'],
    },
    {
      title: 'Maharashra',
      data: ['1,484 km²', '1.9 crores (2012)', '11,312'],
    },
    {
      title: 'Punjab',
      data: ['1,484 km²', '1.9 crores (2012)', '11,312'],
    },
    {
      title: 'Pune',
      data: ['1,484 km²', '1.9 crores (2012)', '11,312'],
    },
    {
      title: 'Harayana',
      data: ['1,484 km²', '1.9 crores (2012)', '11,312'],
    },
    {
      title: 'Tamilnadu',
      data: ['1,484 km²', '1.9 crores (2012)', '11,312'],
    },
    {
      title: 'Bihar',
      data: ['1,484 km²', '1.9 crores (2012)', '11,312'],
    },
    {
      title: 'Belgium',
      data: ['1,484 km²', '1.9 crores (2012)', '11,312'],
    },
    {
      title: 'Bangladesh',
      data: ['1,484 km²', '1.9 crores (2012)', '11,312'],
    },
    {
      title: 'Bangladesh',
      data: ['1,484 km²', '1.9 crores (2012)', '11,312'],
    },
    {
      title: 'Assam',
      data: ['1,484 km²', '1.9 crores (2012)', '11,312'],
    },
    {
      title: 'Karnataka',
      data: ['1,484 km²', '1.9 crores (2012)', '11,312'],
    },
  ];

  //search handle

  const handleChange = (text: string) => {
    onChangeText(text);
    const length = text.length;
    const filteredData = _.filter(DATA, item => {
      return item.title.toLowerCase().slice(0, length) === text.toLowerCase();
    });
    setProcessedData(filteredData);
  };

  //item component

  const Item = ({title}: filteredData) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => handleChange(text)}
        value={text}
        placeholder="Search Cities"
      />
      <View style={styles.dataContainer}>
        <SectionList
          sections={processedData}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Item title={item} />}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0c3259',
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#ede9df',
    padding: 10,
    marginVertical: 8,
  },
  header: {
    fontSize: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
  },
  dataContainer: {
    padding: 10,
  },
});
export default CitySearch;
