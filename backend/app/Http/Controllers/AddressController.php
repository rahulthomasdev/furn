<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index()
    {
        $address = auth()->user()->address;
        if (!empty($address)) {
            return response()->json(['addresses' => $address]);
        } else {
            return response()->json(['message' => 'Address list is empty']);
        }
    }

    public function updateAddress(Request $request)
    {
        $request->validate([
            'addressId' => 'required|exists:addresses,id,user_id,' . auth()->id(),
            'address_line' => 'required',
            'street' => 'required',
            'city' => 'required',
            'state' => 'required',
            'postal_code' => 'required',
            'country' => 'required',
            'landmark' => 'nullable',
        ]);

        $user = auth()->user();
        $addressId = $request->input('addressId');
        $address = $user->address()->find($addressId);
        if ($request->input('primary') == 10) {
            $addressPrimary = $user->address()->where('primary', 10)->first();
            if ($addressPrimary) {
                $addressPrimary->update(['primary' => 20]);
            }
        }
        if (!$address) {
            return response()->json(['message' => 'Address not found']);
        }

        $data = $request->only(['address_name', 'address_line', 'street', 'city', 'state', 'postal_code', 'country', 'landmark']);
        $data['primary'] = $request->input('primary', 20);
        $address->update($data);

        return response()->json(['message' => 'Address updated successfully', 'address' => $address]);
    }

    public function createAddress(Request $request)
    {
        $request->validate([
            'address_name' => 'required',
            'address_line' => 'required',
            'street' => 'required',
            'city' => 'required',
            'state' => 'required',
            'postal_code' => 'required',
            'country' => 'required',
            'landmark' => 'nullable',
        ]);

        $user = auth()->user();
        $existingAddresses = $user->address();
        if ($existingAddresses->count() >= 6) {
            return response()->json(['message' => 'Max addresses reached. Delete existing ones to add new'], 405);
        }
        $data = $request->only(['address_name', 'address_line', 'street', 'city', 'state', 'postal_code', 'country', 'landmark']);
        if ($request->input('primary') == 10) {
            $address = $user->address()->where('primary', 10)->first();
            if ($address) {
                $address->update(['primary' => 20]);
            }
        }
        $data['primary'] = $request->input('primary', 20);
        $user->address()->create($data);

        $user->refresh();
        return response()->json(['message' => 'Address created successfully', 'address' => $user->address()->latest()->first()]);
    }
    public function deleteAddress(Request $request)
    {
        $request->validate([
            'addressId' => 'required'
        ]);
        $user = auth()->user();
        $addressId = $request->input('addressId');
        $address = $user->address()->find($addressId);
        if ($address) {
            $address->delete();
            return response()->json(['message' => 'Address deleted']);
        } else {
            return response()->json(['message' => 'Address not found'], 404);
        }
    }
}
