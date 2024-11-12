export const idlFactory = ({ IDL }) => {
  const TaxPayer = IDL.Record({
    'tid' : IDL.Text,
    'address' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  return IDL.Service({
    'addTaxPayer' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Bool],
        [],
      ),
    'getAllTaxPayers' : IDL.Func([], [IDL.Vec(TaxPayer)], ['query']),
    'searchByTID' : IDL.Func([IDL.Text], [IDL.Opt(TaxPayer)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
