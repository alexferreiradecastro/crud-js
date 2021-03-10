const productsdb = (dbname, table) => {
  const db = new Dexie(dbname);
  db.version(1).stores(table);
  db.open();

  return db;

};

const bulkcreate = (dbtable, data) => {
  let flag = empty(data);
  if (flag) {
    dbtable.bulkAdd([data]);
    console.log("dados inseridos com sucesso...!");
  } else {
    console.log("Por favor insira os dados...!");
  }
  return flag;
};

// criar elementos dinâmicos
const createEle = (tagname, appendTo, fn) => {
  const element = document.createElement(tagname);
  if (appendTo) appendTo.appendChild(element);
  if (fn) fn(element);
};

// verificar a validação da caixa de texto
const empty = (object) => {
  let flag = false;
  for (const value in object) {
    if (object[value] != "" && object.hasOwnProperty(value)) {
      flag = true;
    } else {
      flag = false;
    }
  }
  return flag;
};

// pegar dados do banco
const getData = (dbname, fn) => {
  let index = 0;
  let obj = {};
  dbname.count((count) => {
    // contar linhas na tabela usando o método de contagem
    if (count) {
      dbname.each((table) => {
        // table => retorna os dados do objeto da tabela
        // criar para o loop, para organizar a ordem 
        obj = SortObj(table);
        fn(obj, index++); 
      });
    } else {
      fn(0);
    }
  });
};

const SortObj = (sortobj) => {
  let obj = {};
  obj = {
    id: sortobj.id,
    name: sortobj.name,
    producer: sortobj.producer,
    price: sortobj.price,
  };
  return obj;
};

export default productsdb;
export { bulkcreate, createEle, getData, SortObj };
