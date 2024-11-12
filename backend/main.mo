import Bool "mo:base/Bool";

import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Nat "mo:base/Nat";

actor {
    // Type definition for TaxPayer record
    public type TaxPayer = {
        tid: Text;
        firstName: Text;
        lastName: Text;
        address: Text;
    };

    // Stable variable to store data across upgrades
    private stable var taxpayerEntries : [(Text, TaxPayer)] = [];

    // HashMap to store TaxPayer records
    private var taxpayers = HashMap.HashMap<Text, TaxPayer>(0, Text.equal, Text.hash);

    // Initialize HashMap with stable data after upgrade
    system func postupgrade() {
        taxpayers := HashMap.fromIter<Text, TaxPayer>(taxpayerEntries.vals(), 1, Text.equal, Text.hash);
    };

    // Save HashMap data before upgrade
    system func preupgrade() {
        taxpayerEntries := Iter.toArray(taxpayers.entries());
    };

    // Add new TaxPayer record
    public func addTaxPayer(tid: Text, firstName: Text, lastName: Text, address: Text) : async Bool {
        let taxpayer : TaxPayer = {
            tid;
            firstName;
            lastName;
            address;
        };
        taxpayers.put(tid, taxpayer);
        return true;
    };

    // Search TaxPayer by TID
    public query func searchByTID(tid: Text) : async ?TaxPayer {
        taxpayers.get(tid)
    };

    // Get all TaxPayer records
    public query func getAllTaxPayers() : async [TaxPayer] {
        Iter.toArray(taxpayers.vals())
    };
}
