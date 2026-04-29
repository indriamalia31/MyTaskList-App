import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform, 
  Keyboard,
  Alert,
  StatusBar
} from 'react-native';

export default function App() {
  // P04: State Management
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  // P05: Validasi Input & Fitur Add
  const handleAddTask = () => {
    if (task.trim().length === 0) {
      Alert.alert('Eits!', 'Tugasnya diisi dulu ya, Sis! ✨');
      return;
    }
    
    const newTask = {
      id: Date.now().toString(),
      text: task,
      completed: false,
    };

    setTaskList([...taskList, newTask]);
    setTask('');
    Keyboard.dismiss();
  };

  // P06: Fitur Delete & Mark as Done (Bonus)
  const deleteTask = (id) => {
    setTaskList(taskList.filter(item => item.id !== id));
  };

  const toggleComplete = (id) => {
    setTaskList(taskList.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  // Bonus: Counter
  const completedCount = taskList.filter(t => t.completed).length;

  // P06: Render Item untuk FlatList
  const renderTaskItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity 
        style={styles.itemTextSection} 
        onPress={() => toggleComplete(item.id)}
      >
        <View style={[styles.circular, item.completed && styles.circularCompleted]}>
          {item.completed && <Text style={styles.checkIcon}>✓</Text>}
        </View>
        <Text style={[styles.itemText, item.completed && styles.textCompleted]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteBtnWrapper}>
        <Text style={styles.deleteBtn}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header & Counter */}
      <View style={styles.headerWrapper}>
        <Text style={styles.sectionTitle}>My Sweet Tasks 🌸</Text>
        {taskList.length > 0 && (
          <View style={styles.counterBadge}>
            <Text style={styles.counterText}>
              Done: {completedCount} / {taskList.length}
            </Text>
          </View>
        )}
      </View>

      {/* P06: List Dinamis */}
      <FlatList
        data={taskList}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>☕</Text>
            <Text style={styles.emptyText}>List-nya kosong nih, Sis.</Text>
            <Text style={styles.emptySubText}>Waktunya me-time dulu!</Text>
          </View>
        }
      />

      {/* P05: Form Input dengan KeyboardAvoidingView */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputWrapper}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <TextInput 
          style={styles.input} 
          placeholder={'Tulis rencana cantikmu... 💕'} 
          placeholderTextColor={'#CBB'}
          value={task} 
          onChangeText={text => setTask(text)} 
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

// Palet Warna Cewe/Pastel
const colors = {
  bg: '#FAFAFA',      // Putih Bersih
  text: '#4A4A4A',     // Abu Tua Lembut
  subText: '#999',
  pinkAccent: '#FFB6C1', // Light Pink
  pinkDark: '#FF99AA',
  mintAccent: '#B2F2E1', // Mint Green
  lavender: '#E6E6FA', // Lavender
  white: '#FFFFFF',
  shadow: '#000',
};

// P02 & P03: Styling dengan StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  headerWrapper: {
    paddingTop: 70,
    paddingHorizontal: 25,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'sans-serif-medium',
  },
  counterBadge: {
    backgroundColor: colors.lavender,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  counterText: {
    color: '#8A8AF0', // Ungu Lavender Tua
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 25,
    paddingBottom: 120, // Ruang untuk input di bawah
  },
  itemContainer: {
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    
    // Efek Shadow Halus (iOS)
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    // Efek Shadow (Android)
    elevation: 3,
  },
  itemTextSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: colors.subText,
  },
  circular: {
    width: 24,
    height: 24,
    borderColor: colors.pinkAccent,
    borderWidth: 2,
    borderRadius: 12,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  circularCompleted: {
    backgroundColor: colors.pinkAccent,
    borderColor: colors.pinkAccent,
  },
  checkIcon: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteBtnWrapper: {
    padding: 5,
  },
  deleteBtn: {
    fontSize: 20,
    color: colors.pinkDark,
    fontWeight: '300',
  },
  emptyContainer: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  emptySubText: {
    color: colors.subText,
    fontSize: 14,
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 18,
    paddingHorizontal: 25,
    backgroundColor: colors.white,
    borderRadius: 30,
    borderColor: '#F0F0F0',
    borderWidth: 1,
    width: '80%',
    color: colors.text,
    fontSize: 16,

    // Shadow untuk Input
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: colors.pinkAccent,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    
    // Shadow untuk Tombol Add
    shadowColor: colors.pinkAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  addText: {
    fontSize: 32,
    color: colors.white,
    fontWeight: '300',
    marginTop: -3, // Penyesuaian vertikal
  },
});