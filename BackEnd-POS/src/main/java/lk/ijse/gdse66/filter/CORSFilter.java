package lk.ijse.gdse66.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "CORSFilter", value = "/*")
public class CORSFilter extends HttpFilter {

    @Override
    protected void doFilter(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
        String origin = req.getHeader("origin");
        if (origin == null){
            res.sendError(HttpServletResponse.SC_BAD_REQUEST,"CORS Policy Violation");
            return;
        }
        res.addHeader("Access-Control-Allow-Origin",origin);
        res.addHeader("Access-Control-Allow-Headers","Content-Type");
        res.addHeader("Access-Control-Allow-Methods","DELETE,PUT,GET,POST,OPTION,HEAD");
        chain.doFilter(req,res);
    }
}