import { getCookie } from "./Utilities";


import { notification } from "antd";
import { production } from "../config/constants";

const API_URL = production.url.API_URL;

const fetchProducts = async (pNo) => {
    try {
        const response = await fetch(API_URL + `/products?pageno=${pNo ?? 1}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching products:", error.message);
        return null;
    }
};

const fetchProductsAll = async () => {
    try {
        const response = await fetch(API_URL + `/productsAll`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching products:", error.message);
        return null;
    }
};

const fetchProductDetails = async (pkey) => {
    try {
        const res = await fetch(API_URL + `/product?pkey=${pkey}`);
        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Error fetching product details:', error.message);
        return null;
    }
}

const login = async (email, pwd) => {
    try {
        const res = await fetch(API_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': pwd,
            })
        });

        return res;
    }
    catch (err) {
        console.log('Error loging in:', err.message);
    }
}
const register = async (uname, email, pwd) => {
    try {
        const res = await fetch(API_URL + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'name': uname,
                'email': email,
                'password': pwd,
            })
        });
        const data = res.json();
        return data;
    }
    catch (err) {
        console.log('Error loging in:', err.message);
    }
}

const addCart = async (productKey, qty) => {
    console.log('prod details', productKey, qty);
    try {
        const res = await fetch(API_URL + '/cart', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getCookie('token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                'product_key': productKey,
                'quantity': qty
            })
        });
        if (!res.ok) {
            if (res.status === 401) {
                notification.info({ message: 'Kindly login!' });
            } else if (res.status === 422) {
                notification.error({ message: await res.json().then((data) => data?.message) });
            }
            throw new Error(`Error ${res.status} - ${res.statusText}`);
        }

        const data = res.json();
        return data;
    } catch (err) {
        console.log('Error adding cart data', err.message);
    }
}
const validateToken = async (token) => {
    try {
        const res = await fetch(API_URL + '/cart', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });
        return res;
    } catch (err) {
        console.log('Error validation', err.statusText);
    }
}
const updateProfile = async (name, email, phone, dob) => {
    try {
        const res = await fetch(API_URL + '/updateProfile', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getCookie('token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                'name': name,
                'email': email,
                'phone': phone,
                'dob': dob,
            })
        });
        return res;
    } catch (err) {
        console.log('Error adding cart data', err.message);
    }
}
const fetchCart = async () => {
    try {
        const res = await fetch(API_URL + '/cart', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getCookie('token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        return res;
    } catch (err) {
        console.log('Error adding cart data', err.message);
    }
}

const signOut = async () => {
    try {
        const res = await fetch(API_URL + '/logout', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getCookie('token')}`,
                'Accept': 'application/json',
            }
        });
        return res;
    }
    catch (err) {
        console.log('Error logging out', err.message);
    }
}

const updateWishlist = async (key) => {
    try {
        const res = fetch(API_URL + '/wishlist', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getCookie('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'product_key': key
            })
        });
        return res;
    } catch (err) {
        console.log('Error updating wishlist ', err.message);
    }
}
const fetchWish = async (key) => {
    try {
        const res = fetch(API_URL + '/wishlist', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getCookie('token')}`,
                'Accept': 'application/json',
            },
        });
        return res;
    } catch (err) {
        console.log('Error fetching wishlist ', err.message);
    }
}
const fetchWishlisDetails = async (pNo) => {
    try {
        const response = await fetch(API_URL + `/wishlistDetails?pageno=${pNo ?? 1}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getCookie('token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error.message);
        return null;
    }
};
const fetchAddressList = async () => {
    try {
        const res = await fetch(API_URL + '/address', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getCookie('token')}`,
                'Accept': 'application/json',
            }
        })
        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.log('Error fetching addresess: ', err?.message);
    }
}

const addAddress = async (
    primary, address_name, address_line, street, city, state, postal_code, country, landmark
) => {
    try {
        const res = fetch(API_URL + '/address', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getCookie('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'primary': primary,
                'address_name': address_name,
                'address_line': address_line,
                'street': street,
                'city': city,
                'state': state,
                'postal_code': postal_code,
                'country': country,
                'landmark': landmark
            })
        });
        return res;
    } catch (err) {
        console.log('Error updating wishlist ', err.message);
    }
}
const addressUpdate = async (
    addressId, primary, address_name, address_line, street, city, state, postal_code, country, landmark
) => {
    try {
        const res = fetch(API_URL + '/updateAddress', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getCookie('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'addressId': addressId,
                'primary': primary,
                'address_name': address_name,
                'address_line': address_line,
                'street': street,
                'city': city,
                'state': state,
                'postal_code': postal_code,
                'country': country,
                'landmark': landmark
            })
        });
        return res;
    } catch (err) {
        console.log('Error updating wishlist ', err.message);
    }
}
const deleteAddress = async (addressId) => {
    try {
        const res = await fetch(API_URL + '/addressDelete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${getCookie('token')}`,
            },
            body: JSON.stringify({
                'addressId': addressId
            })
        });
        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return res;
    } catch (err) {
        console.log('Error fetching addresess: ', err?.message);
    }
}
const checkoutCart = async () => {
    try {
        const res = await fetch(API_URL + '/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${getCookie('token')}`,
            },
        });
        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return res;
    } catch (err) {
        console.log('Error checkingout order: ', err?.message);
    }
}
const fetchOrders = async () => {
    try {
        const res = await fetch(API_URL + '/order', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${getCookie('token')}`,
            },
        });
        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return res;
    } catch (err) {
        console.log('Error fetching orders: ', err?.message);
    }
}
const fetchFeedbacks = async () => {
    try {
        const res = await fetch(API_URL + '/feedback', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return res;
    } catch (err) {
        console.log('Error fetching feedbacks: ', err?.message);
    }
}
const submitFeedback = async (data) => {
    try {
        const res = await fetch(API_URL + '/feedback', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return res;
    } catch (err) {
        console.log('Error submitting feedback data: ', err?.message);
    }
}
const searchProducts = async (query) => {
    try {
        const res = await fetch(API_URL + '/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "query": query })
        });
        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return res;
    } catch (err) {
        console.log('Error fetching search products ', err?.message);
    }
}


export { addAddress, addCart, addressUpdate, checkoutCart, deleteAddress, fetchAddressList, fetchCart, fetchFeedbacks, fetchOrders, fetchProductDetails, fetchProducts, fetchProductsAll, fetchWish, fetchWishlisDetails, login, register, searchProducts, signOut, submitFeedback, updateProfile, updateWishlist, validateToken };

