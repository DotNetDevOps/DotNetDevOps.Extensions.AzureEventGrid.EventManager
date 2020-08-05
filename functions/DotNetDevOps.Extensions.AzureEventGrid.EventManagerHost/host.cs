using DotNetDevOps.Extensions.AzureEventGrid.EventManagerApp;
using DotNETDevOps.Extensions.AzureFunctions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotNetDevOps.Extensions.AzureEventGrid.EventManagerHost
{
    public class ServerlessAspNetCore
    {
        [FunctionName("AspNetCoreHost")]
        public Task<IActionResult> Run(
                [HttpTrigger(AuthorizationLevel.Anonymous, Route = "{*all}")]HttpRequest req,
                [AspNetCoreRunner(Startup = typeof(Startup))] IAspNetCoreRunner aspNetCoreRunner,
                ExecutionContext executionContext)
        {
            return aspNetCoreRunner.RunAsync(executionContext);
        }

    }
}
