using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.ReverseProxy.Middleware;
using Microsoft.ReverseProxy.RuntimeModel;

namespace DotNetDevOps.Extensions.AzureEventGrid.EventManagerApp
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHealthChecks();
            services.AddReverseProxy()
                .LoadFromConfig(Configuration.GetSection("ReverseProxy"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.Run(async (context) =>
            //{
            //    await context.Response.WriteAsync("Hello World!");
            //});

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHealthChecks("/.well-known/ready", new HealthCheckOptions()
                {
                    Predicate = (check) => check.Tags.Contains("ready"),
                 //   ResponseWriter = Writer
                });

                endpoints.MapHealthChecks("/.well-known/live", new HealthCheckOptions
                {
                    Predicate = (_) => false
                });

                endpoints.MapGet("/.well-known/configuration", async (context) => {

                    var isConfigured = string.Equals("true", Environment.GetEnvironmentVariable("WEBSITE_AUTH_ENABLED"), StringComparison.OrdinalIgnoreCase);
                    context.Response.StatusCode = isConfigured ? 200 : 404;

                });
                endpoints.MapPost("/.well-known/configuration", async (context) => {

                    var isConfigured = string.Equals("true", Environment.GetEnvironmentVariable("WEBSITE_AUTH_ENABLED"), StringComparison.OrdinalIgnoreCase);
                    if (!isConfigured)
                    {
                        var appToken = new AzureServiceTokenProvider();
                        var token = await appToken.GetAuthenticationResultAsync("https://management.azure.com/");
                        var http = new HttpClient();
                        http.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token.AccessToken);
                        context.Response.StatusCode = 202;
                       await context.Response.WriteAsync(token.AccessToken);
                        return;
                    }

                    context.Response.StatusCode = 404;

                });


                endpoints.MapReverseProxy(proxyPipeline =>
                {

                    // Custom endpoint selection
                    proxyPipeline.Use((context, next) =>
                    {
                        var someCriteria = false;// context.Request.Path.StartsWithSegments("/api"); // MeetsCriteria(context);
                        if (someCriteria)
                        {
                            var availableDestinationsFeature = context.Features.Get<IReverseProxyFeature>();
                            var destination = availableDestinationsFeature.AvailableDestinations[0]; // PickDestination(availableDestinationsFeature.Destinations);
                            // Load balancing will no-op if we've already reduced the list of available destinations to 1.
                            availableDestinationsFeature.AvailableDestinations = destination;

                            
                        }

                        return next();
                    });
                    proxyPipeline.UseAffinitizedDestinationLookup();
                    proxyPipeline.UseProxyLoadBalancing();
                    proxyPipeline.UseRequestAffinitizer();

                });
            });
        }
    }
}
