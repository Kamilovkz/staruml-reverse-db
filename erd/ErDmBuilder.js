class ErDmBuilder {

  constructor(model) {
    this._root = model;
  }

  createErdEntity(element) {

    const elem = new type.ERDEntity();

    elem._parent = this._root;
    elem.name = element.table_name;
    elem.documentation = element.table_description;

    this._root.ownedElements.push(elem);

    return elem;
  }


  createErdColumn(namespace, element, handleRefNotFound) {

    const elem = new type.ERDColumn();

    elem._parent = namespace;
    elem.name = element.column_name;
    elem.documentation = element.column_description;
    elem.primaryKey = Boolean(element.is_primary_key);
    elem.nullable = Boolean(element.is_nullable);
    elem.unique = !elem.primaryKey && Boolean(element.is_unique);
    elem.type = element.data_type;
    elem.length = element.max_length ? element.max_length.toString() : "";
    elem.foreignKey = Boolean(element.is_foreign_key);
    elem.referenceTo = elem.foreignKey
        ? this.createReference(elem,
            element.foreign_key_name,
            element.referenced_table_name,
            element.referenced_column_name,
            handleRefNotFound)
        : undefined;

    namespace.columns.push(elem);

    return elem;
  }


  createReference(column, foreignKeyName, refEntityName, refColumnName, handleRefNotFound) {
    if (!column.foreignKey) {
      throw new Error("The column is not a foreign key!");
    }

    const referredEntity = this._root.findByName(refEntityName);
    if (!referredEntity) {
      handleRefNotFound(column, foreignKeyName, refEntityName, refColumnName);
      return undefined;
    }

    const referenceTo = referredEntity.findByName(refColumnName);
    if (!referenceTo) {
      handleRefNotFound(column, foreignKeyName, refEntityName, refColumnName);
      return undefined;
    }

    return referenceTo;
  }

  createErdRelationship(namespace, elementFrom, elementTo, name) {
    if (!elementFrom.foreignKey) {
      throw new Error("The starting point of the relation is not a foreign key!");
    }

    return this.createErdRelationshipWithoutCheck(namespace, elementFrom, elementTo, name);
  }

  createErdRelationshipWithoutCheck(namespace, elementFrom, elementTo, name) {
    const elem = new type.ERDRelationship();

    elem._parent = namespace;
    elem.name = name;
    elem.identifying = true;
    elem.end1 = this.createErdRelationshipEnd(elem, elementFrom, "",
        elementFrom.unique ? "0..1" : "0..*");
    elem.end2 = this.createErdRelationshipEnd(elem, elementTo, elementFrom.name,
        elementFrom.nullable ? "0..1" : "1");

    namespace.ownedElements.push(elem);

    return elem;
  }
  createErdRelationshipEnd(namespace, element, name, cardinality) {
    const elem = new type.ERDRelationshipEnd();

    elem._parent = namespace;
    elem.name = name;
    elem.identifying = true;
    elem.cardinality = cardinality;
    elem.reference = element._parent;

    return elem;
  };
}

module.exports = ErDmBuilder;
