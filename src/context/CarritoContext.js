import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Tipos de acciones del carrito
const CARRITO_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Reducer para manejar el estado del carrito
const carritoReducer = (state, action) => {
  switch (action.type) {
    case CARRITO_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    }
    
    case CARRITO_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case CARRITO_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case CARRITO_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: []
      };
    
    case CARRITO_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload || []
      };
    
    default:
      return state;
  }
};

// Estado inicial del carrito
const initialState = {
  items: []
};

// Crear el contexto
const CarritoContext = createContext();

// Provider del carrito
export const CarritoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(carritoReducer, initialState);

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('maquifit_carrito');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: CARRITO_ACTIONS.LOAD_CART, payload: cartData });
      } catch (error) {
        console.error('Error al cargar carrito desde localStorage:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('maquifit_carrito', JSON.stringify(state.items));
  }, [state.items]);

  // Funciones del carrito
  const addItem = (producto) => {
    dispatch({ type: CARRITO_ACTIONS.ADD_ITEM, payload: producto });
  };

  const removeItem = (productoId) => {
    dispatch({ type: CARRITO_ACTIONS.REMOVE_ITEM, payload: productoId });
  };

  const updateQuantity = (productoId, quantity) => {
    dispatch({ type: CARRITO_ACTIONS.UPDATE_QUANTITY, payload: { id: productoId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CARRITO_ACTIONS.CLEAR_CART });
  };

  // Calcular totales
  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.precio) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getItemQuantity = (productoId) => {
    const item = state.items.find(item => item.id === productoId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productoId) => {
    return state.items.some(item => item.id === productoId);
  };

  const value = {
    // Estado
    items: state.items,
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice(),
    
    // Acciones
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    
    // Utilidades
    getItemQuantity,
    isInCart
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};

// Hook para usar el contexto del carrito
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

export default CarritoContext;
