import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ExpenseContext = createContext();

const initialState = {
  expenses: [],
  categories: ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other'],
  filters: {
    category: '',
    dateFrom: '',
    dateTo: '',
    search: ''
  },
  sortBy: 'date',
  sortOrder: 'desc',
  darkMode: false
};

function expenseReducer(state, action) {
  switch (action.type) {
    case 'LOAD_EXPENSES':
      return { ...state, expenses: action.payload };
    
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === action.payload.id ? action.payload : expense
        )
      };
    
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload)
      };
    
    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.payload.key]: action.payload.value }
      };
    
    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: { category: '', dateFrom: '', dateTo: '', search: '' }
      };
    
    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder
      };
    
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    
    default:
      return state;
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedExpenses) {
      dispatch({ type: 'LOAD_EXPENSES', payload: JSON.parse(savedExpenses) });
    }
    
    if (savedDarkMode) {
      if (JSON.parse(savedDarkMode)) {
        dispatch({ type: 'TOGGLE_DARK_MODE' });
      }
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(state.expenses));
  }, [state.expenses]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
  };

  const updateExpense = (expense) => {
    dispatch({ type: 'UPDATE_EXPENSE', payload: expense });
  };

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  const setFilter = (key, value) => {
    dispatch({ type: 'SET_FILTER', payload: { key, value } });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const setSort = (sortBy, sortOrder) => {
    dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } });
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  // Get filtered and sorted expenses
  const getFilteredExpenses = () => {
    let filtered = [...state.expenses];

    // Apply filters
    if (state.filters.category) {
      filtered = filtered.filter(expense => expense.category === state.filters.category);
    }

    if (state.filters.dateFrom) {
      filtered = filtered.filter(expense => expense.date >= state.filters.dateFrom);
    }

    if (state.filters.dateTo) {
      filtered = filtered.filter(expense => expense.date <= state.filters.dateTo);
    }

    if (state.filters.search) {
      filtered = filtered.filter(expense =>
        expense.title.toLowerCase().includes(state.filters.search.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[state.sortBy];
      let bValue = b[state.sortBy];

      if (state.sortBy === 'amount') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else if (state.sortBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (state.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const getTotalAmount = (expenses = state.expenses) => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

  const getCategoryData = () => {
    const categoryTotals = {};
    state.expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + parseFloat(expense.amount);
    });

    return Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount,
      percentage: ((amount / getTotalAmount()) * 100).toFixed(1)
    }));
  };

  const value = {
    ...state,
    addExpense,
    updateExpense,
    deleteExpense,
    setFilter,
    clearFilters,
    setSort,
    toggleDarkMode,
    getFilteredExpenses,
    getTotalAmount,
    getCategoryData
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
}