import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FBCloudFirestore {
  USERS = 'users';
  MINDTEST = 'mindtest';
  
  constructor(
    private afstore: AngularFirestore
  ) { }

  private queryCondition(ref, condition: any){
    return ref.where(condition["attributes"], condition["statement"], condition["value"]);
  }

  private queryPaginate(ref, paginate: any){
    const orderby = paginate["desc"] ? 'asc' : 'desc';
    let query = ref.orderBy(paginate["attribute"], orderby);
    if (paginate["startAfter"] != 0) {
      query = query.startAfter(paginate["startAfter"]);
    }

    return query.limit(paginate["limit"]);
  }
  
  private queryOrderBy(ref, orderBy: any){
    const orderby = orderBy["desc"] ?  'desc' : 'asc';
    let query = ref.orderBy(orderBy["attribute"], orderby);
    return query;
  }

  private queryClause(clause: any, ref){
    let query = ref;
    
    if(clause.hasOwnProperty("paginate")){
      query = this.queryPaginate(query, clause["paginate"]);
    }

    if(clause.hasOwnProperty("condition")){
      for(let i = 0; i < clause["condition"].length; i++){
        let item = clause["condition"][i];
        query = this.queryCondition(query, item);
      }
    }
    
    if(clause.hasOwnProperty("orderBy")){
      query = this.queryOrderBy(query, clause["orderBy"]);
    }
    return query;
  }

  private queryNull(ref){
    return ref;
  }

  get(nodes, clause: any = null) {
    const queryClause = clause ? this.queryClause.bind(this, clause) : this.queryNull;
    return this.afstore.collection(`${nodes}`, queryClause);
    
  }

  getByID(nodes, id) {
    return this.afstore.doc(`${nodes}/${id}`).valueChanges();
  }

  async add(nodes, data) {
    return await this.afstore.collection(nodes).add(data);
  }

  async edit(nodes, id, data) {
    return await this.afstore.doc(`${nodes}/${id}`).set(data, { merge: true });
  }

  async delete(nodes, id) {
    return await this.afstore.doc(`${nodes}/${id}`).delete();
  }
}
