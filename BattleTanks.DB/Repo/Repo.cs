using BattleTanks.DB.EF;
using BattleTanks.DB.IRepo;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BattleTanks.DB.Repo
{
    public class Repo<T> : IRepo<T> where T : class
    {

        protected readonly AppDbContext Database;
        protected readonly DbSet<T> Entities;

        public Repo(AppDbContext context)
        {
            Database = context;
            Entities = context.Set<T>();
        }


        public T Insert(T entity)
        {
            if (entity == null)
            {
                throw new NotImplementedException();
            }
            Entities.Add(entity);
            return entity;
        }

        public T Update(T entity)
        {
            if (entity == null)
                throw new NotImplementedException();
            Entities.Update(entity);
            return entity;
        }


        public IQueryable<T> Get(string includeProperties = "")
        {
            return includeProperties.Split(new char[] {','}, StringSplitOptions.RemoveEmptyEntries)
                .Aggregate<string, IQueryable<T>>(Entities,
                    (current, includeProperty) => current.Include(includeProperty));
        }


        public T Get(Guid id)
        {
            return Entities.Find(id);
        }

        public T Delete(T entity)
        {
            if (entity == null)
            {
                throw new NotImplementedException();
            }
            Entities.Remove(entity);
            return entity;
        }       
    }
}
