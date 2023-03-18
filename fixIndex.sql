drop index "Product_name_organizationIdx_key";
create unique index "Product_name_organizationIdx_key" on "Product" (name, "organizationIdx") NULLS NOT DISTINCT;
