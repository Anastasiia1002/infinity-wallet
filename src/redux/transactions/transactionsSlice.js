import { createSlice } from '@reduxjs/toolkit';
import { logOutUser } from 'redux/auth/authOperation';
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionCategories,
  getTransactionsForPeriod,
  updateTransaction,
} from './transactionsOperation';
console.log();
const userInitialState = {
  transactions: [],
  transactionsForPeriod: [],
  transactionCategories: [],
  isLoading: false,
  error: null,
  isModalAddTransactionOpen: false,
  modalData: {},
};

const pendingHandlerAuth = (state, action) => {
  state.isLoading = true;
  state.error = null;
};

const rejectedHandler = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  state.isModalAddTransactionOpen = false;
};

const transactionSlice = createSlice({
  name: 'transaction',

  initialState: userInitialState,

  reducers: {
    openModal(state, action) {
      state.isModalAddTransactionOpen = true;
    },
    closeModal(state, action) {
      state.isModalAddTransactionOpen = false;
      state.modalData = {};
    },
    addModalData(state, action) {
      state.modalData = action.payload;
    },
  },
  extraReducers: {
    [createTransaction.pending]: pendingHandlerAuth,
    [getAllTransactions.pending]: pendingHandlerAuth,
    [updateTransaction.pending]: pendingHandlerAuth,
    [deleteTransaction.pending]: pendingHandlerAuth,
    [createTransaction.rejected]: rejectedHandler,
    [getAllTransactions.rejected]: rejectedHandler,
    [updateTransaction.rejected]: rejectedHandler,
    [deleteTransaction.rejected]: rejectedHandler,
    [getTransactionsForPeriod.pending]: pendingHandlerAuth,
    [getTransactionsForPeriod.rejected]: rejectedHandler,
    [getTransactionCategories.pending]: pendingHandlerAuth,
    [getTransactionCategories.rejected]: rejectedHandler,

    [createTransaction.fulfilled](state, action) {
      state.error = null;
      state.isLoading = false;
      state.transactions.push(action.payload);
      state.isModalAddTransactionOpen = false;
    },

    [getAllTransactions.fulfilled](state, action) {
      state.error = null;
      state.isLoading = false;
      state.transactions = action.payload;

      // state.transactions = sortedTtransactions(action.payload);
    },

    [updateTransaction.fulfilled](state, action) {
      state.error = null;
      state.isLoading = false;
      state.transactions = state.transactions.map(transaction =>
        transaction.id === action.payload.response.id
          ? action.payload.response
          : transaction
      );
      state.isModalAddTransactionOpen = false;
      state.modalData = {};
    },

    [deleteTransaction.fulfilled](state, action) {
      // console.log('payload delete', action.payload);
      state.error = null;
      state.isLoading = false;
      state.transactions = state.transactions.filter(
        transaction => transaction.id !== action.payload.id
      );
    },

    [getTransactionsForPeriod.fulfilled](state, action) {
      state.transactionsForPeriod = action.payload;
      state.error = null;
      state.isLoading = false;
    },

    [getTransactionCategories.fulfilled](state, action) {
      state.error = null;
      state.isLoading = false;
      state.transactionCategories = action.payload;
    },

    [logOutUser.fulfilled](state, action) {
      state.transactions = [];
      state.transactionsForPeriod = [];
      state.transactionCategories = [];
    },
  },
});

export const { openModal, closeModal, addModalData } = transactionSlice.actions;
export const transactionReducer = transactionSlice.reducer;
