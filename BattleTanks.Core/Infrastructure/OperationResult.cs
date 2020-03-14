using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.Infrastructure
{
    public class OperationResult
    {
        public bool Successed { get; set; }
        public string Message { get; set; }
        public string Property { get; set; }

        public OperationResult()
        {
            Successed = false;
            Message = "Bad request";
            Property = "";
        }

        public OperationResult(bool successed, string message, string prop)
        {
            Successed = successed;
            Message = message;
            Property = prop;
        }

        public OperationResult(bool successed) : this(successed, "", "")
        {
        }
    }
}
